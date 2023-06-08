import bc from 'bcryptjs';

export function usePasswordHelper() {
  async function hashPassword(password: string) {
    const salt = await bc.genSalt(10);
    return bc.hash(password, salt);
  }

  function validateHashedPassword(password: string, hashedPassword: string): boolean {
    return bc.compare(password, hashedPassword);
  }

  return {
    hashPassword,
    validateHashedPassword,
  };
}
