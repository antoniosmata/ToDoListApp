import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiMail, CiLock, CiUser } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from '../../hooks/useAuth';
import { SignUpDto } from '../../types';
import { validateField, validateSignUpForm } from '../../utils/validation';
import sharedStyles from './AuthForms.module.css';
import styles from './SignUpForm.module.css';

// Type assertions for React 19 compatibility
const MailIcon = CiMail as React.ComponentType<any>;
const LockIcon = CiLock as React.ComponentType<any>;
const UserIcon = CiUser as React.ComponentType<any>;
const EyeIcon = FaRegEye as React.ComponentType<any>;
const EyeSlashIcon = FaRegEyeSlash as React.ComponentType<any>;

/**
 * Sign-up form component that handles user registration
 * Provides form validation, real-time field validation, and user account creation
 * Features password visibility toggles and comprehensive error handling
 * @returns JSX element representing the sign-up form
 */
const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<SignUpDto>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  /**
   * Toggles the visibility of the password field
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Toggles the visibility of the confirm password field
   */
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  /**
   * Validates the entire form using validation utilities
   * @returns Whether the form is valid
   */
  const validateForm = () => {
    const validationResult = validateSignUpForm(formData, confirmPassword);
    setErrors(validationResult.errors);
    return validationResult.isValid;
  };

  /**
   * Handles form input changes with real-time validation
   * Updates form state and validates individual fields
   * @param e - Input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let currentPassword = formData.password;
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      const updatedFormData = { ...formData, [name]: value };
      setFormData(updatedFormData);
      if (name === 'password') {
        currentPassword = value;
      }
    }

    // Real-time validation
    const fieldValidation = validateField(name, value, { password: currentPassword });
    
    setErrors(prev => {
      const newErrors = { ...prev };
      if (!fieldValidation.isValid && fieldValidation.error) {
        newErrors[name] = fieldValidation.error;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  /**
   * Handles form submission and user registration
   * Validates form data and creates user account via API
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});

    try {
      await signUp(formData);
      navigate('/tasks');
    } catch (error: any) {
      setErrors({ general: error.response?.data?.message || 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={sharedStyles.authContainer}>
      <div className={sharedStyles.authHeader}>
        <div className={sharedStyles.authTitle}>
          Sign Up
        </div>
      </div>

      {errors.general && <div className={sharedStyles.generalError}>{errors.general}</div>}

      <form onSubmit={handleSubmit} className={sharedStyles.formWrapper}>
        {/* First Name Field */}
        <div className={styles.inputGroupWithError}>
          <div className={sharedStyles.inputGroup}>
            <div className={sharedStyles.inputWrapper}>
              <div className={sharedStyles.inputContent}>
                <UserIcon size="1.5rem" color="#828282" className={sharedStyles.inputIcon} />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="First Name"
                  className={sharedStyles.input}
                />
              </div>
            </div>
          </div>
          {errors.firstName && <div className={sharedStyles.errorMessage}>{errors.firstName}</div>}
        </div>

        {/* Last Name Field */}
        <div className={styles.inputGroupWithError}>
          <div className={sharedStyles.inputGroup}>
            <div className={sharedStyles.inputWrapper}>
              <div className={sharedStyles.inputContent}>
                <UserIcon size="1.5rem" color="#828282" className={sharedStyles.inputIcon} />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Last Name"
                  className={sharedStyles.input}
                />
              </div>
            </div>
          </div>
          {errors.lastName && <div className={sharedStyles.errorMessage}>{errors.lastName}</div>}
        </div>

        {/* Email Field */}
        <div className={styles.inputGroupWithError}>
          <div className={sharedStyles.inputGroup}>
            <div className={sharedStyles.inputWrapper}>
              <div className={sharedStyles.inputContent}>
                <MailIcon size="1.5rem" color="#828282" className={sharedStyles.inputIcon} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Email"
                  className={sharedStyles.input}
                />
              </div>
            </div>
          </div>
          {errors.email && <div className={sharedStyles.errorMessage}>{errors.email}</div>}
        </div>

        {/* Password Field */}
        <div className={styles.inputGroupWithError}>
          <div className={sharedStyles.inputGroup}>
            <div className={sharedStyles.inputWrapper}>
              <div className={sharedStyles.inputContent}>
                <LockIcon size="1.5rem" color="#828282" className={sharedStyles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Password"
                  className={`${sharedStyles.input} ${sharedStyles.inputWithButton}`}
                />
              </div>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={sharedStyles.eyeButton}
              >
                {showPassword ? (
                  <EyeIcon size="1.5rem" color="#828282" />
                ) : (
                  <EyeSlashIcon size="1.5rem" color="#828282" />
                )}
              </button>
            </div>
          </div>
          {errors.password && <div className={sharedStyles.errorMessage}>{errors.password}</div>}
        </div>

        {/* Confirm Password Field */}
        <div className={styles.inputGroupWithError}>
          <div className={sharedStyles.inputGroup}>
            <div className={sharedStyles.inputWrapper}>
              <div className={sharedStyles.inputContent}>
                <LockIcon size="1.5rem" color="#828282" className={sharedStyles.inputIcon} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Confirm Password"
                  className={`${sharedStyles.input} ${sharedStyles.inputWithButton}`}
                />
              </div>
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className={sharedStyles.eyeButton}
              >
                {showConfirmPassword ? (
                  <EyeIcon size="1.5rem" color="#828282" />
                ) : (
                  <EyeSlashIcon size="1.5rem" color="#828282" />
                )}
              </button>
            </div>
          </div>
          {errors.confirmPassword && <div className={sharedStyles.errorMessage}>{errors.confirmPassword}</div>}
        </div>
      </form>

      <div className={sharedStyles.buttonSection}>
        <div className={sharedStyles.buttonContainer}>
          <div className={sharedStyles.buttonGroup}>
            <div className={sharedStyles.buttonActions}>
              <div className={styles.signUpForm}>
                <div className={styles.signUpButtonContainer}>
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={handleSubmit}
                    className={sharedStyles.primaryButton}
                  >
                    <div className={sharedStyles.buttonContent}>
                      <div className={sharedStyles.buttonText}>
                        {loading ? 'Creating account...' : 'Sign Up'}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div className={sharedStyles.dividerSection}>
                <div className={sharedStyles.dividerLine}></div>
                <div className={sharedStyles.dividerText}>
                  Or
                </div>
                <div className={sharedStyles.dividerLine}></div>
              </div>
            </div>
            <div className={sharedStyles.bottomSection}>
              <div className={sharedStyles.bottomText}>
                Already have an account? Welcome back!
              </div>
              <div className={sharedStyles.bottomButtonWrapper}>
                <Link
                  to="/signin"
                  className={sharedStyles.secondaryButton}
                >
                  <div className={sharedStyles.buttonContent}>
                    <div className={sharedStyles.secondaryButtonText}>
                      Sign In
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;