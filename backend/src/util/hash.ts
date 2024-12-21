import * as crypto from 'crypto'

export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex')
}

export function hashToken(token: string, salt: string): string {
  return crypto
    .createHash('sha256')
    .update(token + salt)
    .digest('hex')
}

export function verifyToken(
  providedToken: string,
  storedHash: string,
  storedSalt: string
): boolean {
  const computedHash = hashToken(providedToken, storedSalt)
  return computedHash === storedHash
}
