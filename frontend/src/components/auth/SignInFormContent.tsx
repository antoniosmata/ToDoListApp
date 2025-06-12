import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiMail, CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from '../../hooks/useAuth';
import { SignInDto } from '../../types';

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
  const [errors, setErrors] = useState<string>('');
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
    if (errors) setErrors('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors('');

    try {
      await signIn(formData);
      navigate('/tasks');
    } catch (error: any) {
      setErrors(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      paddingLeft: '4rem',
      paddingRight: '4rem',
      paddingTop: '2.5rem',
      paddingBottom: '2.5rem',
      background: 'white',
      borderRadius: '0.625rem',
      backdropFilter: 'blur(12px)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
      display: 'inline-flex'
    }}>
      <div style={{
        paddingBottom: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.625rem',
        display: 'inline-flex'
      }}>
        <div style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: '#343434',
          fontSize: '1.625rem',
          fontFamily: 'Inter',
          fontWeight: '700',
          wordWrap: 'break-word'
        }}>
          Sign In
        </div>
      </div>

      {errors && <div className="error-message">{errors}</div>}

      <form onSubmit={handleSubmit} style={{
        width: '20.5625rem',
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        gap: '1rem',
        display: 'flex'
      }}>
        {/* Email Field */}
        <div style={{
          width: '20.5625rem',
          height: '2.75rem',
          position: 'relative'
        }}>
          <div style={{
            width: '20.5625rem',
            height: '2.75rem',
            position: 'absolute',
            borderRadius: '0.5rem',
            outline: '1px #D0D0D0 solid',
            outlineOffset: '-1px'
          }}>
            <div style={{
              left: '0.5rem',
              top: '0.625rem',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              display: 'inline-flex'
            }}>
              <MailIcon size="1.5rem" color="#828282" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Email"
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: '#828282',
                  fontSize: '0.875rem',
                  fontFamily: 'Inter',
                  fontWeight: '400',
                  width: '16.25rem'
                }}
              />
            </div>
          </div>
        </div>

        {/* Password Field */}
        <div style={{
          alignSelf: 'stretch',
          height: '2.75rem',
          position: 'relative'
        }}>
          <div style={{
            width: '20.5625rem',
            height: '2.75rem',
            position: 'absolute',
            borderRadius: '0.5rem',
            outline: '1px #D0D0D0 solid',
            outlineOffset: '-1px'
          }}>
            <div style={{
              left: '0.5rem',
              top: '0.625rem',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              display: 'inline-flex'
            }}>
              <LockIcon size="1.5rem" color="#828282" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Password"
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: '#828282',
                  fontSize: '0.875rem',
                  fontFamily: 'Inter',
                  fontWeight: '400',
                  width: '14.375rem'
                }}
              />
            </div>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                width: '1.5rem',
                height: '1.5rem',
                position: 'absolute',
                right: '0.625rem',
                top: '0.625rem',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              {showPassword ? (
                <EyeSlashIcon size="1.5rem" color="#828282" />
              ) : (
                <EyeIcon size="1.5rem" color="#828282" />
              )}
            </button>
          </div>
        </div>

        <div style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: '#356247',
          fontSize: '0.875rem',
          fontFamily: 'Inter',
          fontWeight: '500',
          wordWrap: 'break-word',
          cursor: 'pointer'
        }}>
          Forgot password?
        </div>
      </form>

      <div style={{
        width: '20.5625rem',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        display: 'inline-flex'
      }}>
        <div style={{
          flex: '1 1 0',
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '1rem',
          display: 'inline-flex'
        }}>
          <div style={{
            alignSelf: 'stretch',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '1.5rem',
            display: 'flex'
          }}>
            <div style={{
              alignSelf: 'stretch',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '1rem',
              display: 'flex'
            }}>
              <div style={{
                alignSelf: 'stretch',
                height: '2.5rem',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '0.5rem',
                display: 'inline-flex'
              }}>
                <div style={{
                  flex: '1 1 0',
                  height: '2.5rem',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  display: 'inline-flex'
                }}>
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={handleSubmit}
                    style={{
                      alignSelf: 'stretch',
                      height: '2.75rem',
                      paddingLeft: '6rem',
                      paddingRight: '6rem',
                      background: '#356247',
                      borderRadius: '0.625rem',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '0.5rem',
                      display: 'flex',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) e.currentTarget.style.backgroundColor = '#2d5139';
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) e.currentTarget.style.backgroundColor = '#356247';
                    }}
                  >
                    <div style={{
                      height: '2.5rem',
                      paddingTop: '0.6875rem',
                      paddingBottom: '0.6875rem',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: '0.5rem',
                      display: 'inline-flex'
                    }}>
                      <div style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'white',
                        fontSize: '0.875rem',
                        fontFamily: 'Inter',
                        fontWeight: '700',
                        wordWrap: 'break-word'
                      }}>
                        {loading ? 'Signing in...' : 'Sign In'}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div style={{
                width: '16.3125rem',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.1875rem',
                display: 'inline-flex'
              }}>
                <div style={{
                  flex: '1 1 0',
                  height: '0.0625rem',
                  background: '#E6E9FA'
                }}></div>
                <div style={{
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  color: '#828282',
                  fontSize: '0.875rem',
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  wordWrap: 'break-word'
                }}>
                  Or
                </div>
                <div style={{
                  flex: '1 1 0',
                  height: '0.0625rem',
                  background: '#E6E9FA'
                }}></div>
              </div>
            </div>
            <div style={{
              alignSelf: 'stretch',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              display: 'flex'
            }}>
              <div style={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                color: '#828282',
                fontSize: '0.875rem',
                fontFamily: 'Inter',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                Don't have an account? No worries, click below.
              </div>
              <div style={{
                alignSelf: 'stretch',
                height: '2.75rem',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                display: 'flex'
              }}>
                <Link
                  to="/signup"
                  style={{
                    alignSelf: 'stretch',
                    height: '2.75rem',
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    borderRadius: '0.625rem',
                    outline: '1px #356247 solid',
                    outlineOffset: '-1px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    display: 'flex',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#356247';
                    const textElement = e.currentTarget.querySelector('div div') as HTMLElement;
                    if (textElement) textElement.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    const textElement = e.currentTarget.querySelector('div div') as HTMLElement;
                    if (textElement) textElement.style.color = '#356247';
                  }}
                >
                  <div style={{
                    height: '2.5rem',
                    paddingTop: '0.6875rem',
                    paddingBottom: '0.6875rem',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '0.5rem',
                    display: 'inline-flex'
                  }}>
                    <div style={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      color: '#356247',
                      fontSize: '0.875rem',
                      fontFamily: 'Inter',
                      fontWeight: '500',
                      wordWrap: 'break-word',
                      transition: 'color 0.3s ease'
                    }}>
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