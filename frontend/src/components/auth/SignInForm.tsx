import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiMail, CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from '../../hooks/useAuth';
import { SignInDto } from '../../types';
import sharedStyles from './AuthForms.module.css';
import styles from './SignInForm.module.css';

// Type assertions for React 19 compatibility
const MailIcon = CiMail as React.ComponentType<any>;
const LockIcon = CiLock as React.ComponentType<any>;
const EyeIcon = FaRegEye as React.ComponentType<any>;
const EyeSlashIcon = FaRegEyeSlash as React.ComponentType<any>;

const SignInFormContent: React.FC = () => {
  const [formData, setFormData] = useState<SignInDto>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (Object.keys(errors).length > 0) setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await signIn(formData);
      navigate('/tasks');
    } catch (error: any) {
      // Customize error message for common authentication errors
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      
      if (errorMessage.toLowerCase().includes('password') || 
          errorMessage.toLowerCase().includes('invalid') ||
          errorMessage.toLowerCase().includes('incorrect') ||
          error.response?.status === 401) {
        setErrors({ password: 'Wrong password. Please try again.' });
      } else if (errorMessage.toLowerCase().includes('email') || 
                 errorMessage.toLowerCase().includes('user') ||
                 errorMessage.toLowerCase().includes('not found')) {
        setErrors({ email: 'Email not found. Please check your email address.' });
      } else {
        setErrors({ general: errorMessage });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={sharedStyles.authContainer}>
      <div className={sharedStyles.authHeader}>
        <div className={sharedStyles.authTitle}>
          Sign In
        </div>
      </div>

      {errors.general && <div className={sharedStyles.generalError}>{errors.general}</div>}

      <form onSubmit={handleSubmit} className={sharedStyles.formWrapper}>
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

        <div className={styles.forgotPasswordWrapper}>
          Forgot password?
        </div>
      </form>

      <div className={sharedStyles.buttonSection}>
        <div className={sharedStyles.buttonContainer}>
          <div className={sharedStyles.buttonGroup}>
            <div className={sharedStyles.buttonActions}>
              <div className={styles.signInForm}>
                <div className={styles.signInButtonContainer}>
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={handleSubmit}
                    className={sharedStyles.primaryButton}
                  >
                    <div className={sharedStyles.buttonContent}>
                      <div className={sharedStyles.buttonText}>
                        {loading ? 'Signing in...' : 'Sign In'}
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
                Don't have an account? No worries, click below.
              </div>
              <div className={sharedStyles.bottomButtonWrapper}>
                <Link
                  to="/signup"
                  className={sharedStyles.secondaryButton}
                >
                  <div className={sharedStyles.buttonContent}>
                    <div className={sharedStyles.secondaryButtonText}>
                      Sign Up
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

export default SignInFormContent;