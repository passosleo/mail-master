import { phone as phoneValidator } from 'phone';

export function useStringHelper() {
  function splitName(name: string) {
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    return {
      firstName,
      lastName,
    };
  }

  function addLeadingZeros(str: string, targetLength: number) {
    return str.padStart(targetLength, '0');
  }

  function hashStringGenerator(length = 6) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  function formatFirstName(fullName: string) {
    const modifiedStr =
      fullName.toLowerCase().charAt(0).toUpperCase() + fullName.toLowerCase().slice(1);
    const firstName = modifiedStr.split(' ')[0];
    return firstName;
  }

  function validatePhone(phone: string) {
    const { isValid: isPhoneValid, phoneNumber } = phoneValidator(phone, {
      country: 'BRA',
    });

    return {
      isPhoneValid,
      phoneNumber,
    };
  }

  return {
    splitName,
    addLeadingZeros,
    hashStringGenerator,
    formatFirstName,
    validatePhone,
  };
}
