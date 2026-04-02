/* @/lib/utils/validation/username-validation.ts */
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,30}$/;

export const validateUsername = (username: string): { isValid: boolean; error?: string } => {
  if (!username) {
    return { isValid: false, error: 'Username is required' };
  }
  if (username.length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters' };
  }
  if (username.length > 30) {
    return { isValid: false, error: 'Username must be less than 30 characters' };
  }
  if (!USERNAME_REGEX.test(username)) {
    return { 
      isValid: false, 
      error: 'Username can only contain letters, numbers, and underscores' 
    };
  }
  return { isValid: true };
};

export const sanitizeUsername = (username: string): string => {
  return username.toLowerCase().replace(/[^a-z0-9_]/g, '_');
};