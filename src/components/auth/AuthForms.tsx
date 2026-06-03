'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

/**
 * Example Sign Up Component
 * 
 * Usage:
 * <SignUpForm />
 */
export function SignUpForm() {
  const router = useRouter();
  const { signUp, isLoading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError(null);
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!formData.fullName.trim()) {
      setFormError('Full name is required');
      return;
    }
    if (!formData.email.includes('@')) {
      setFormError('Valid email is required');
      return;
    }
    if (formData.password.length < 8) {
      setFormError('Password must be at least 8 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    try {
      const response = await signUp({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        // Redirect to email verification page
        router.push(`/auth/verify-otp?email=${encodeURIComponent(formData.email)}`);
      } else {
        setFormError(response.error || 'Sign up failed');
      }
    } catch (err) {
      setFormError('An unexpected error occurred');
    }
  };

  const displayError = formError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="••••••••"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="••••••••"
        />
      </div>

      {displayError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {displayError}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/auth/login" className="text-blue-600 hover:underline">
          Sign In
        </a>
      </p>
    </form>
  );
}

/**
 * Example Login Component
 * 
 * Usage:
 * <LoginForm />
 */
export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError(null);
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.email.includes('@')) {
      setFormError('Valid email is required');
      return;
    }
    if (!formData.password) {
      setFormError('Password is required');
      return;
    }

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        router.push('/product/dashboard');
      } else {
        setFormError(response.error || 'Login failed');
      }
    } catch (err) {
      setFormError('An unexpected error occurred');
    }
  };

  const displayError = formError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="••••••••"
        />
      </div>

      {displayError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {displayError}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      <div className="space-y-2">
        <a
          href="/auth/forgot-password"
          className="block text-center text-sm text-blue-600 hover:underline"
        >
          Forgot your password?
        </a>
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/auth/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </form>
  );
}

/**
 * Example Google OAuth Button
 * 
 * Usage:
 * <GoogleAuthButton />
 */
export function GoogleAuthButton() {
  const { signInWithGoogle, isLoading } = useAuth();

  const handleClick = () => {
    const redirectUrl = `${window.location.origin}/product/dashboard`;
    const errorUrl = `${window.location.origin}/auth/login`;
    signInWithGoogle(redirectUrl, errorUrl);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:bg-gray-100"
    >
      {isLoading ? 'Redirecting...' : 'Sign in with Google'}
    </button>
  );
}

/**
 * Example OTP Verification Component
 * 
 * Usage:
 * <VerifyOtpForm email="user@example.com" />
 */
export function VerifyOtpForm({ email }: { email: string }) {
  const router = useRouter();
  const { verifyOtp, resendOtp, isLoading, error } = useAuth();
  
  const [otp, setOtp] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!otp.trim()) {
      setFormError('OTP is required');
      return;
    }

    try {
      const response = await verifyOtp({ email, otp });
      if (response.success) {
        router.push('/product/dashboard');
      } else {
        setFormError(response.error || 'Invalid OTP');
      }
    } catch (err) {
      setFormError('Verification failed');
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setFormError(null);
    try {
      const response = await resendOtp(email);
      if (response.success) {
        setFormError('OTP resent to your email');
      } else {
        setFormError(response.error || 'Failed to resend OTP');
      }
    } catch (err) {
      setFormError('Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const displayError = formError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <p className="text-sm text-gray-600 mb-2">
          We sent a verification code to <strong>{email}</strong>
        </p>
        <label htmlFor="otp" className="block text-sm font-medium mb-1">
          Verification Code
        </label>
        <input
          id="otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={isLoading}
          className="w-full px-3 py-2 border rounded-md text-center text-2xl tracking-widest"
          placeholder="000000"
          maxLength={6}
        />
      </div>

      {displayError && (
        <div className={`p-3 rounded-md text-sm ${
          formError && formError.includes('resent')
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {displayError}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? 'Verifying...' : 'Verify'}
      </button>

      <button
        type="button"
        onClick={handleResend}
        disabled={resendLoading}
        className="w-full px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md disabled:text-gray-400"
      >
        {resendLoading ? 'Sending...' : 'Resend Code'}
      </button>
    </form>
  );
}

/**
 * Example Protected Route Wrapper
 * 
 * Usage:
 * <ProtectedPage component={Dashboard} />
 */
export function ProtectedPage({
  component: Component,
  ...props
}: {
  component: React.ComponentType<any>;
  [key: string]: any;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  return <Component {...props} />;
}
