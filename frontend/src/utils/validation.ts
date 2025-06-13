/**
 * Result of a single field validation
 * @interface ValidationResult
 * @property isValid - Whether the field value is valid
 * @property error - Optional error message if validation failed
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Result of validating an entire form
 * @interface FormValidationResult
 * @property isValid - Whether all form fields are valid
 * @property errors - Object mapping field names to error messages
 */
export interface FormValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

/**
 * Regular expression patterns for field validation
 * @constant VALIDATION_PATTERNS
 */
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

/**
 * Collection of individual field validation functions
 * @constant validators
 */
export const validators = {
  /**
   * Validates first name field
   * @param value - First name value to validate
   * @returns Validation result with error message if invalid
   */
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

  /**
   * Validates last name field
   * @param value - Last name value to validate
   * @returns Validation result with error message if invalid
   */
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

  /**
   * Validates email address field
   * @param value - Email value to validate
   * @returns Validation result with error message if invalid
   */
  email: (value: string): ValidationResult => {
    if (!value.trim()) {
      return { isValid: false, error: 'Email is required' };
    }
    if (!VALIDATION_PATTERNS.email.test(value.trim())) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }
    return { isValid: true };
  },

  /**
   * Validates password field with strength requirements
   * Requires: 8+ chars, uppercase, lowercase, number, special character
   * @param value - Password value to validate
   * @returns Validation result with error message if invalid
   */
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

  /**
   * Validates password confirmation field
   * @param value - Confirmation password value
   * @param originalPassword - Original password to match against
   * @returns Validation result with error message if invalid
   */
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

/**
 * Validates a single form field by name
 * @param fieldName - Name of the field to validate
 * @param value - Field value to validate
 * @param additionalData - Additional data needed for validation (e.g., original password)
 * @returns Validation result
 */
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

/**
 * Validates entire sign-up form data
 * @param formData - Object containing all form field values
 * @param formData.firstName - User's first name
 * @param formData.lastName - User's last name
 * @param formData.email - User's email address
 * @param formData.password - User's password
 * @param confirmPassword - Password confirmation value
 * @returns Form validation result with field-specific errors
 */
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