import * as CryptoJS from 'crypto-js';

export function useEncryptionHelper(key?: string) {
  const encryptionKey = key ?? 'F-JaNdRfUjXn2r5u8x/A?D(G+KbPeShV';

  function encrypt<T>(value: T) {
    return CryptoJS.AES.encrypt(JSON.stringify(value), encryptionKey).toString();
  }

  function decrypt<T>(value: string) {
    const bytes = CryptoJS.AES.decrypt(value, encryptionKey);
    const decoded = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decoded as T;
  }

  return {
    encrypt,
    decrypt,
  };
}
