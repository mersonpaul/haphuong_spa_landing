/**
 * Vietnamese phone number helpers for the booking form.
 * Accepted numbers (normalized to the leading-0 form):
 *   - Mobile:   0 + (3|5|7|8|9) + 8 digits  → 10 digits (03x, 05x, 07x, 08x, 09x)
 *   - Landline: 02 + 9 digits               → 11 digits (024 Hà Nội, 028 TP.HCM...)
 * International prefixes +84 / 84 are normalized to 0.
 */

const VN_PHONE_REGEX = /^0(2\d{9}|[35789]\d{8})$/;

/** Strip formatting and convert +84/84 prefixes to the leading-0 form. */
export function normalizeVnPhone(raw: string): string {
  let digits = raw.replace(/[^\d+]/g, '');
  if (digits.startsWith('+84')) {
    digits = `0${digits.slice(3)}`;
  } else if (digits.startsWith('84') && digits.length >= 11) {
    digits = `0${digits.slice(2)}`;
  }
  digits = digits.replace(/\D/g, '');
  // Cap at the max valid length (11 for 02x landlines, 10 otherwise)
  const maxLength = digits.startsWith('02') ? 11 : 10;
  return digits.slice(0, maxLength);
}

export function isValidVnPhone(digits: string): boolean {
  return VN_PHONE_REGEX.test(digits);
}

/**
 * Display format, applied progressively while typing:
 *   Mobile   0987 475 822   (4-3-3)
 *   Landline 024 3123 4567  (3-4-4)
 */
export function formatVnPhone(digits: string): string {
  const parts = digits.startsWith('02')
    ? [digits.slice(0, 3), digits.slice(3, 7), digits.slice(7, 11)]
    : [digits.slice(0, 4), digits.slice(4, 7), digits.slice(7, 10)];
  return parts.filter(Boolean).join(' ');
}
