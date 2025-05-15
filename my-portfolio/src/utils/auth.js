export const isValidToken = (token) => 
  token && 
  typeof token === 'string' && 
  token.length > 30 && 
  !['undefined', 'null', 'dummy-token'].includes(token); 