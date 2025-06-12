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
      paddingLeft: '64px',
      paddingRight: '64px',
      paddingTop: '32px',
      paddingBottom: '32px',
      background: 'white',
      borderRadius: '10px',
      backdropFilter: 'blur(12px)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '32px',
      display: 'inline-flex'
    }}>
      <div style={{
        paddingBottom: '32px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        display: 'inline-flex'
      }}>
        <div style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: '#343434',
          fontSize: '26px',
          fontFamily: 'Inter',
          fontWeight: '700',
          wordWrap: 'break-word'
        }}>
          Sign In
        </div>
      </div>

      {errors && <div className="error-message">{errors}</div>}

      <form onSubmit={handleSubmit} style={{
        width: '329px',
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        gap: '16px',
        display: 'flex'
      }}>
        {/* Email Field */}
        <div style={{
          width: '329px',
          height: '44px',
          position: 'relative'
        }}>
          <div style={{
            width: '329px',
            height: '44px',
            position: 'absolute',
            borderRadius: '8px',
            outline: '1px #D0D0D0 solid',
            outlineOffset: '-1px'
          }}>
            <div style={{
              left: '8px',
              top: '10px',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              display: 'inline-flex'
            }}>
              <MailIcon size="24px" color="#828282" />
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
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  fontWeight: '400',
                  width: '260px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Password Field */}
        <div style={{
          alignSelf: 'stretch',
          height: '44px',
          position: 'relative'
        }}>
          <div style={{
            width: '329px',
            height: '44px',
            position: 'absolute',
            borderRadius: '8px',
            outline: '1px #D0D0D0 solid',
            outlineOffset: '-1px'
          }}>
            <div style={{
              left: '8px',
              top: '10px',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              display: 'inline-flex'
            }}>
              <LockIcon size="24px" color="#828282" />
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
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  fontWeight: '400',
                  width: '230px'
                }}
              />
            </div>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                width: '24px',
                height: '24px',
                position: 'absolute',
                right: '10px',
                top: '10px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              {showPassword ? (
                <EyeSlashIcon size="24px" color="#828282" />
              ) : (
                <EyeIcon size="24px" color="#828282" />
              )}
            </button>
          </div>
        </div>

        <div style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: '#356247',
          fontSize: '14px',
          fontFamily: 'Inter',
          fontWeight: '500',
          wordWrap: 'break-word',
          cursor: 'pointer'
        }}>
          Forgot password?
        </div>
      </form>

      <div style={{
        width: '329px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        display: 'inline-flex'
      }}>
        <div style={{
          flex: '1 1 0',
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '16px',
          display: 'inline-flex'
        }}>
          <div style={{
            alignSelf: 'stretch',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '24px',
            display: 'flex'
          }}>
            <div style={{
              alignSelf: 'stretch',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '16px',
              display: 'flex'
            }}>
              <div style={{
                alignSelf: 'stretch',
                height: '40px',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '8px',
                display: 'inline-flex'
              }}>
                <div style={{
                  flex: '1 1 0',
                  height: '40px',
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
                      height: '44px',
                      paddingLeft: '96px',
                      paddingRight: '96px',
                      background: '#356247',
                      borderRadius: '10px',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '8px',
                      display: 'flex',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      height: '40px',
                      paddingTop: '11px',
                      paddingBottom: '11px',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: '8px',
                      display: 'inline-flex'
                    }}>
                      <div style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'white',
                        fontSize: '14px',
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
                width: '261px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '3px',
                display: 'inline-flex'
              }}>
                <div style={{
                  flex: '1 1 0',
                  height: '1px',
                  background: '#E6E9FA'
                }}></div>
                <div style={{
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  color: '#828282',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  wordWrap: 'break-word'
                }}>
                  Or
                </div>
                <div style={{
                  flex: '1 1 0',
                  height: '1px',
                  background: '#E6E9FA'
                }}></div>
              </div>
            </div>
            <div style={{
              alignSelf: 'stretch',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              display: 'flex'
            }}>
              <div style={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                color: '#828282',
                fontSize: '14px',
                fontFamily: 'Inter',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                Don't have an account? No worries, click below.
              </div>
              <div style={{
                alignSelf: 'stretch',
                height: '44px',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                display: 'flex'
              }}>
                <Link
                  to="/signup"
                  style={{
                    alignSelf: 'stretch',
                    height: '44px',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    borderRadius: '10px',
                    outline: '1px #356247 solid',
                    outlineOffset: '-1px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    display: 'flex',
                    textDecoration: 'none'
                  }}
                >
                  <div style={{
                    height: '40px',
                    paddingTop: '11px',
                    paddingBottom: '11px',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '8px',
                    display: 'inline-flex'
                  }}>
                    <div style={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      color: '#356247',
                      fontSize: '14px',
                      fontFamily: 'Inter',
                      fontWeight: '500',
                      wordWrap: 'break-word'
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