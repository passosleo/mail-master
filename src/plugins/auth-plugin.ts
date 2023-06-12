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
    const token = jwt.sign(payload, process.env.JWT_SECRET as Secret, options);

    return token;
  }

  async function verifyToken<T extends string | object | Buffer>(
    token: string,
  ) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as T;

    return decoded;
  }

  return {
    generateToken,
    verifyToken,
  };
}
