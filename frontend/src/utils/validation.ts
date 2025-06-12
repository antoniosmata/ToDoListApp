export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

// Regex patterns
export const VALIDATION_PATTERNS = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  name: /^[a-zA-Z\s'-]{2,30}$/,
  password: {
    minLength: /.{8,}/,
    lowercase: /(?=.*[a-z])/,
    uppercase: /(?=.*[A-Z])/,
    number: /(?=.*\d)/,
    specialChar: /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
  },
};

// Individual field validators
export const validators = {
  firstName: (value: string): ValidationResult => {
    if (!value.trim()) {
      return { isValid: false, error: 'First name is required' };
    }
    if (!VALIDATION_PATTERNS.name.test(value.trim())) {
      return {
        isValid: false,
        error: 'First name must be 2-30 characters and contain only letters, spaces, hyphens, and apostrophes',
      };
    }
    return { isValid: true };
  },

  lastName: (value: string): ValidationResult => {
    if (!value.trim()) {
      return { isValid: false, error: 'Last name is required' };
    }
    if (!VALIDATION_PATTERNS.name.test(value.trim())) {
      return {
        isValid: false,
        error: 'Last name must be 2-30 characters and contain only letters, spaces, hyphens, and apostrophes',
      };
    }
    return { isValid: true };
  },

  email: (value: string): ValidationResult => {
    if (!value.trim()) {
      return { isValid: false, error: 'Email is required' };
    }
    if (!VALIDATION_PATTERNS.email.test(value.trim())) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }
    return { isValid: true };
  },

  password: (value: string): ValidationResult => {
    if (!value) {
      return { isValid: false, error: 'Password is required' };
    }
    if (!VALIDATION_PATTERNS.password.minLength.test(value)) {
      return { isValid: false, error: 'Password must be at least 8 characters long' };
    }
    if (!VALIDATION_PATTERNS.password.lowercase.test(value)) {
      return { isValid: false, error: 'Password must contain at least one lowercase letter' };
    }
    if (!VALIDATION_PATTERNS.password.uppercase.test(value)) {
      return { isValid: false, error: 'Password must contain at least one uppercase letter' };
    }
    if (!VALIDATION_PATTERNS.password.number.test(value)) {
      return { isValid: false, error: 'Password must contain at least one number' };
    }
    if (!VALIDATION_PATTERNS.password.specialChar.test(value)) {
      return { isValid: false, error: 'Password must contain at least one special character' };
    }
    return { isValid: true };
  },

  confirmPassword: (value: string, originalPassword: string): ValidationResult => {
    if (!value) {
      return { isValid: false, error: 'Please confirm your password' };
    }
    if (value !== originalPassword) {
      return { isValid: false, error: 'Passwords do not match' };
    }
    return { isValid: true };
  },
};

// Validate a single field
export const validateField = (fieldName: string, value: string, additionalData?: any): ValidationResult => {
  switch (fieldName) {
    case 'firstName':
      return validators.firstName(value);
    case 'lastName':
      return validators.lastName(value);
    case 'email':
      return validators.email(value);
    case 'password':
      return validators.password(value);
    case 'confirmPassword':
      return validators.confirmPassword(value, additionalData?.password || '');
    default:
      return { isValid: true };
  }
};

// Validate entire form
export const validateSignUpForm = (formData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}, confirmPassword: string): FormValidationResult => {
  const errors: { [key: string]: string } = {};
  
  // Validate each field
  const firstNameResult = validators.firstName(formData.firstName);
  if (!firstNameResult.isValid) errors.firstName = firstNameResult.error!;
  
  const lastNameResult = validators.lastName(formData.lastName);
  if (!lastNameResult.isValid) errors.lastName = lastNameResult.error!;
  
  const emailResult = validators.email(formData.email);
  if (!emailResult.isValid) errors.email = emailResult.error!;
  
  const passwordResult = validators.password(formData.password);
  if (!passwordResult.isValid) errors.password = passwordResult.error!;
  
  const confirmPasswordResult = validators.confirmPassword(confirmPassword, formData.password);
  if (!confirmPasswordResult.isValid) errors.confirmPassword = confirmPasswordResult.error!;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};