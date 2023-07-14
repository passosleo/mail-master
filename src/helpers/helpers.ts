import { useDateHelper } from './date';
import { useEncryptionHelper } from './encryption';
import { useFileHelper } from './file';
import { useNumberHelper } from './number';
import { usePasswordHelper } from './password';
import { useStringHelper } from './string';

export function useHelpers() {
  return {
    date: useDateHelper(),
    encryption: useEncryptionHelper(),
    number: useNumberHelper(),
    password: usePasswordHelper(),
    string: useStringHelper(),
    file: useFileHelper(),
  };
}
