/* eslint-disable @typescript-eslint/no-explicit-any */
export const compare = (a: any, b: any) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    const len = Math.min(a.length, b.length)
    for (let i = 0; i < len; ++i) {
      const _a = a[i]
      const _b = b[i]
      if (_a < _b) return -1
      else if (_a > _b) return 1
    }
  }
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b)
  }
  return a < b ? -1 : a > b ? 1 : 0
}

export const sort = <T>(arr: Array<T>, cmp: (a: T, b: T) => number = compare) =>
  arr.slice().sort(cmp)

export const bySelector =
  <Item>(selector: (item: Item) => any) =>
  (a: Item, b: Item) =>
    compare(selector(a), selector(b))

export const byProp =
  <Key extends keyof any, Item extends {[key in Key]: any}>(key: Key, desc?: boolean) =>
  (a: Item, b: Item) =>
    desc ? compare(b[key], a[key]) : compare(a[key], b[key])

const wordSplitter = /[\t\n ]+/g
export const splitWords = (text: string): string[] => text.split(wordSplitter)
export const last = <T>(array: T[]): T | undefined => array[array.length - 1]

export const debounce = <Args extends unknown[]>(fn: (...args: Args) => unknown, delay: number) => {
  let id: number | undefined = undefined
  return (...args: Args): void => {
    if (id) clearTimeout(id)
    id = setTimeout(() => fn(...args), delay)
  }
}

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

export type PromiseCancelable<T> = Promise<T> & {cancel: () => void}

export const setTimeoutPromise = <Fn extends (...args: any[]) => any, AbortValue>(
  fn: Fn,
  timeout: number,
  abortValue: AbortValue,
  ...args: Parameters<Fn>
): PromiseCancelable<Awaited<ReturnType<Fn>>> => {
  type Ret = Awaited<ReturnType<Fn>>
  let timeoutId: number | undefined = undefined
  let cancel = () => {}
  const promise = new Promise<Ret>((resolve, reject) => {
    cancel = () => {
      clearTimeout(timeoutId)
      reject(abortValue)
    }
    timeoutId = setTimeout(() => {
      Promise.resolve()
        .then(() => fn(...args))
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    }, timeout)
  }) as PromiseCancelable<Ret>
  promise.cancel = cancel
  return promise
}

export const debouncePromise = <Fn extends (...args: any[]) => any, AbortValue>(
  fn: Fn,
  timeout: number,
  abortValue: AbortValue
) => {
  type Ret = Awaited<ReturnType<Fn>>
  let promise = {cancel: () => {}}
  return (...args: Parameters<Fn>): PromiseCancelable<Ret> => {
    promise.cancel()
    return (promise = setTimeoutPromise(fn, timeout, abortValue, ...args))
  }
}

export const getUniqueBy = <T>(array: T[], getKey: (el: T) => string) => {
  return array.reduce(uniqueByReducer<T>(getKey), [] as T[])
}

const uniqueByReducer = <T>(getKey: (el: T) => string) => {
  const set = new Set<string>()
  return (prev: T[], curr: T) => {
    const key = getKey(curr)
    if (set.has(key)) {
      return prev
    }
    set.add(key)
    prev.push(curr)
    return prev
  }
}

export function log<T>(x: T): T {
  console.log(x)
  return x
}

/**
 * Calls {fn} immediately when the returned function is called, after that at most once per {timeout}.
 */
export const throttle = <Args extends any[]>(fn: (...args: Args) => unknown, timeout: number) => {
  let pending = false
  let waiting = false
  let lastArgs: Args
  const wait = () =>
    delay(timeout).then(() => {
      if (pending) {
        pending = false
        fn(...lastArgs)
        wait()
      } else {
        waiting = false
      }
    })
  return (...args: Args) => {
    lastArgs = args
    if (pending) return
    if (waiting) {
      pending = true
      return
    }
    waiting = true
    Promise.resolve().then(() => fn(...args))
    wait()
  }
}

export const getWordBounds = (text: string, pos: number): {start: number; end: number} => {
  if (!text) return {start: 0, end: 0}
  if (pos < 0) pos = 0
  if (pos > text.length) pos = text.length

  let end = pos
  while (end < text.length && ![' ', '\t', '\n'].includes(text[end]!)) end++

  let start = pos
  while (start > 0 && ![' ', '\t', '\n'].includes(text[start - 1]!)) start--
  return {start, end}
}
export const spliceString = (str: string, start: number, end: number, insert: string) =>
  str.slice(0, start) + insert + str.slice(end)

export const indexBy = <T, K extends string>(arr: T[], keyFn: (item: T) => K) => {
  const map = {} as Record<K, T>
  for (const item of arr) {
    map[keyFn(item)] = item
  }
  return map
}
