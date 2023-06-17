import jwt, { Secret, SignOptions } from 'jsonwebtoken';

type GenerateTokenOptions<T extends string | object | Buffer> = {
  payload: T;
  options?: SignOptions;
};

export function useAuth() {
  async function generateToken<T extends string | object | Buffer>({
    payload,
    options = { expiresIn: '1d' },
  }: GenerateTokenOptions<T>) {
    return jwt.sign(payload, process.env.JWT_SECRET as Secret, options);
  }

  async function verifyToken<T>(token: string): Promise<T> {
    return jwt.verify(token, process.env.JWT_SECRET as Secret) as T;
  }

  return {
    generateToken,
    verifyToken,
  };
}
