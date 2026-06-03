'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  login,
  signUp,
  verifyEmailOtp,
  resendVerificationOtp,
  signInWithGoogle,
  handleGoogleCallback,
  requestPasswordReset,
  resetPassword,
  resendResetPassword,
  uploadProfileImage,
  getCurrentUser,
  type SignUpRequest,
  type LoginRequest,
  type ResetPasswordRequest,
  type AuthResponse,
  type VerificationResponse,
} from '@rayo/api-client';
import {
  isAuthenticated,
  getAuthToken,
  setAuthToken,
  clearAuthData,
  parseAuthResponse,
  setStoredUser,
  getStoredUser,
  type AuthUser,
  type SignUpInput,
  type LoginInput,
  type VerifyOtpInput,
  type ResetPasswordInput,
} from '@rayo/auth-client';

export interface UseAuthReturn {
  // State
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  // Auth Methods
  signUp: (data: SignUpInput) => Promise<AuthResponse>;
  login: (data: LoginInput) => Promise<AuthResponse>;
  verifyOtp: (data: VerifyOtpInput) => Promise<VerificationResponse>;
  resendOtp: (email: string) => Promise<VerificationResponse>;
  signInWithGoogle: (redirectUrl: string, errorUrl: string) => void;
  handleGoogleCallback: (params: any) => Promise<AuthResponse>;
  requestPasswordReset: (email: string) => Promise<VerificationResponse>;
  resetPassword: (data: ResetPasswordInput) => Promise<VerificationResponse>;
  resendResetPassword: (email: string) => Promise<VerificationResponse>;
  uploadProfileImage: (file: File) => Promise<{ success: boolean; imageUrl?: string; error?: string }>;
  getCurrentUserProfile: () => Promise<AuthUser | null>;
  logout: () => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

/**
 * useAuth Hook
 *
 * Provides authentication functionality for the frontend
 * Manages user state, auth tokens, and API calls
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load stored user on mount
  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsHydrated(true);
  }, []);

  const handleAuthSuccess = useCallback((response: AuthResponse) => {
    if (response.success && response.data) {
      // Extract user from response
      const userData: AuthUser = {
        id: response.data.userId || response.data.user?.id || '',
        email: response.data.email || response.data.user?.email || '',
        isVerified: response.data.isVerified || response.data.user?.isVerified || false,
        emailVerified: response.data.emailVerified || response.data.user?.emailVerified || false,
      };

      setUser(userData);
      setStoredUser(userData);

      // Store token if provided
      if (response.data.token) {
        setAuthToken(response.data.token);
      }

      setError(null);
    }
  }, []);

  const handleSignUp = useCallback(
    async (data: SignUpInput): Promise<AuthResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await signUp({
          email: data.email,
          password: data.password,
          fullName: data.fullName,
        } as SignUpRequest);

        if (response.success) {
          handleAuthSuccess(response);
        } else {
          setError(response.error || 'Sign up failed');
        }

        return response;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Sign up failed';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    [handleAuthSuccess]
  );

  const handleLogin = useCallback(
    async (data: LoginInput): Promise<AuthResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await login({
          email: data.email,
          password: data.password,
        } as LoginRequest);

        if (response.success) {
          handleAuthSuccess(response);
        } else {
          setError(response.error || 'Login failed');
        }

        return response;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Login failed';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    [handleAuthSuccess]
  );

  const handleVerifyOtp = useCallback(
    async (data: VerifyOtpInput): Promise<VerificationResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await verifyEmailOtp(data);

        if (!response.success) {
          setError(response.error || 'OTP verification failed');
        } else {
          setError(null);
        }

        return response;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'OTP verification failed';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleResendOtp = useCallback(
    async (email: string): Promise<VerificationResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await resendVerificationOtp(email);

        if (!response.success) {
          setError(response.error || 'Failed to resend OTP');
        } else {
          setError(null);
        }

        return response;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to resend OTP';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleSignInWithGoogle = useCallback(
    (redirectUrl: string, errorUrl: string) => {
      setError(null);
      signInWithGoogle(redirectUrl, errorUrl);
    },
    []
  );

  const handleGoogleCallbackWrapper = useCallback(
    async (params: any): Promise<AuthResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await handleGoogleCallback(params);

        if (response.success) {
          handleAuthSuccess(response);
        } else {
          setError(response.error || 'Google authentication failed');
        }

        return response;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Google authentication failed';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    [handleAuthSuccess]
  );

  const handleRequestPasswordReset = useCallback(
    async (email: string): Promise<VerificationResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await requestPasswordReset(email);

        if (!response.success) {
          setError(response.error || 'Failed to send reset link');
        } else {
          setError(null);
        }

        return response;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to send reset link';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleResetPassword = useCallback(
    async (data: ResetPasswordInput): Promise<VerificationResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await resetPassword({
          token: data.token,
          password: data.password,
          confirmPassword: data.confirmPassword || data.password,
        } as ResetPasswordRequest);

        if (!response.success) {
          setError(response.error || 'Password reset failed');
        } else {
          setError(null);
        }

        return response;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Password reset failed';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleResendResetPassword = useCallback(
    async (email: string): Promise<VerificationResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await resendResetPassword(email);

        if (!response.success) {
          setError(response.error || 'Failed to resend reset link');
        } else {
          setError(null);
        }

        return response;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to resend reset link';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleUploadProfileImage = useCallback(
    async (file: File): Promise<{ success: boolean; imageUrl?: string; error?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await uploadProfileImage(file);

        if (!response.success) {
          setError(response.error || 'Failed to upload image');
        } else {
          // Update user avatar URL if successful
          if (user && response.imageUrl) {
            const updatedUser = { ...user, avatarUrl: response.imageUrl };
            setUser(updatedUser);
            setStoredUser(updatedUser);
          }
          setError(null);
        }

        return response;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to upload image';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  const handleGetCurrentUserProfile = useCallback(async (): Promise<AuthUser | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const profile = await getCurrentUser();
      const userData: AuthUser = {
        id: profile.id,
        email: profile.email || '',
        fullName: profile.fullName,
        avatarUrl: profile.avatarUrl,
      };

      setUser(userData);
      setStoredUser(userData);
      return userData;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch user profile';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    clearAuthData();
    setUser(null);
    setError(null);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: isHydrated ? isAuthenticated() : false,
    error,
    signUp: handleSignUp,
    login: handleLogin,
    verifyOtp: handleVerifyOtp,
    resendOtp: handleResendOtp,
    signInWithGoogle: handleSignInWithGoogle,
    handleGoogleCallback: handleGoogleCallbackWrapper,
    requestPasswordReset: handleRequestPasswordReset,
    resetPassword: handleResetPassword,
    resendResetPassword: handleResendResetPassword,
    uploadProfileImage: handleUploadProfileImage,
    getCurrentUserProfile: handleGetCurrentUserProfile,
    logout: handleLogout,
    setError,
    clearError: () => setError(null),
  };
}
