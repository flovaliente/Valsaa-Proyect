// Utilidades para el formulario de tarjeta del pago simulado

export const TEST_CARDS = {
    approved: '4111 1111 1111 1111',
    rejected: '4000 0000 0000 0002',
};

export const onlyDigits = (value) => value.replace(/\D/g, '');

export const formatCardNumber = (value) => onlyDigits(value).slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');

export const formatExpiry = (value) => {
    const digits = onlyDigits(value).slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

export const getCardBrand = (number) => {
    const digits = onlyDigits(number);
    if (/^4/.test(digits)) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(digits)) return 'Mastercard';
    if (/^3[47]/.test(digits)) return 'American Express';
    if (/^589657/.test(digits)) return 'OCA';
    return null;
};

// Algoritmo de Luhn: el dígito de control que tienen todas las tarjetas reales
export const isValidCardNumber = (number) => {
    const digits = onlyDigits(number);
    if (digits.length < 13 || digits.length > 19) return false;

    let sum = 0;
    digits.split('').reverse().forEach((char, index) => {
        let digit = Number(char);
        if (index % 2 === 1) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
    });
    return sum % 10 === 0;
};

export const isValidExpiry = (expiry) => {
    const match = /^(\d{2})\/(\d{2})$/.exec(expiry);
    if (!match) return false;
    const month = Number(match[1]);
    const year = 2000 + Number(match[2]);
    if (month < 1 || month > 12) return false;
    // La tarjeta vence al final del mes indicado
    return new Date(year, month, 1) > new Date();
};
