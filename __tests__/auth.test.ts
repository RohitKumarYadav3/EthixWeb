import { createSessionToken, verifySessionToken } from '@/lib/auth';

describe('Authentication — Session Token', () => {
  const originalSecret = process.env.AUTH_SECRET;

  beforeAll(() => {
    process.env.AUTH_SECRET = 'test-secret-key-for-testing-only';
  });

  afterAll(() => {
    process.env.AUTH_SECRET = originalSecret;
  });

  it('creates a valid session token', () => {
    const token = createSessionToken('admin@ethixweb.com');
    expect(token).toBeTruthy();
    expect(token.split('.')).toHaveLength(2);
  });

  it('verifies a valid token and returns the payload', () => {
    const token = createSessionToken('admin@ethixweb.com');
    const payload = verifySessionToken(token);
    expect(payload).not.toBeNull();
    expect(payload?.email).toBe('admin@ethixweb.com');
    expect(payload?.expiresAt).toBeGreaterThan(Date.now());
  });

  it('rejects a tampered token', () => {
    const token = createSessionToken('admin@ethixweb.com');
    const [data, sig] = token.split('.');
    const tamperedToken = `${data}.invalid-signature`;
    const payload = verifySessionToken(tamperedToken);
    expect(payload).toBeNull();
  });

  it('rejects an expired token', () => {
    const token = createSessionToken('admin@ethixweb.com');
    const [data, sig] = token.split('.');
    // Decode payload, set expiry in the past, re-encode
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf-8'));
    payload.expiresAt = Date.now() - 1000;
    const expiredData = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const crypto = require('crypto');
    const newSig = crypto.createHmac('sha256', 'test-secret-key-for-testing-only').update(expiredData).digest('base64url');
    const expiredToken = `${expiredData}.${newSig}`;
    const result = verifySessionToken(expiredToken);
    expect(result).toBeNull();
  });

  it('rejects undefined token', () => {
    const result = verifySessionToken(undefined);
    expect(result).toBeNull();
  });

  it('rejects null token', () => {
    const result = verifySessionToken(null);
    expect(result).toBeNull();
  });

  it('rejects malformed token (no dot)', () => {
    const result = verifySessionToken('justastring');
    expect(result).toBeNull();
  });

  it('rejects malformed token (invalid base64)', () => {
    const result = verifySessionToken('!!!.!!!');
    expect(result).toBeNull();
  });

  it('rejects token with wrong secret', () => {
    process.env.AUTH_SECRET = 'different-secret';
    const token = createSessionToken('admin@ethixweb.com');
    process.env.AUTH_SECRET = 'test-secret-key-for-testing-only';
    const result = verifySessionToken(token);
    expect(result).toBeNull();
  });
});

describe('Authentication — Password Verification', () => {
  it('verifies a correct password against a bcrypt hash', async () => {
    const bcrypt = require('bcryptjs');
    const hash = bcrypt.hashSync('test-password-123', 10);
    process.env.ADMIN_PASSWORD_HASH = hash;
    const { verifyPassword } = await import('@/lib/auth');
    const result = await verifyPassword('test-password-123');
    expect(result).toBe(true);
  });

  it('rejects an incorrect password', async () => {
    const bcrypt = require('bcryptjs');
    const hash = bcrypt.hashSync('correct-password', 10);
    process.env.ADMIN_PASSWORD_HASH = hash;
    const { verifyPassword } = await import('@/lib/auth');
    const result = await verifyPassword('wrong-password');
    expect(result).toBe(false);
  });

  it('returns false when ADMIN_PASSWORD_HASH is not set', async () => {
    delete process.env.ADMIN_PASSWORD_HASH;
    const { verifyPassword } = await import('@/lib/auth');
    const result = await verifyPassword('any-password');
    expect(result).toBe(false);
  });
});
