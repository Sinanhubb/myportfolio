// src/utils/auth.js
export const isValidToken = (token) => {
  if (!token || typeof token !== 'string') return false;
  if (token.length <= 30) return false;
  if (['undefined', 'null', 'dummy-token'].includes(token)) return false;
  return true;
};