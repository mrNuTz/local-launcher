import {Button, useComputedColorScheme, useMantineColorScheme} from '@mantine/core'
import {IconMoon, IconSun} from '@tabler/icons-react'

export const ColorSchemeToggle = () => {
  const {toggleColorScheme} = useMantineColorScheme()
  const cs = useComputedColorScheme()
  return (
    <Button
      pos='absolute'
      top='0.25rem'
      left='0.25rem'
      size='compact-sm'
      tabIndex={-1}
      onClick={toggleColorScheme}
    >
      {cs === 'light' ? <IconMoon /> : <IconSun />}
    </Button>
  )
}
