'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../../hooks/useAuth';

/**
 * Example Forgot Password Component
 * 
 * Usage:
 * <ForgotPasswordForm />
 */
export function ForgotPasswordForm() {
  const { requestPasswordReset, isLoading, error, clearError } = useAuth();
  
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    clearError();

    if (!email.includes('@')) {
      setFormError('Valid email is required');
      return;
    }

    try {
      const response = await requestPasswordReset(email);
      if (response.success) {
        setSubmitted(true);
      } else {
        setFormError(response.error || 'Failed to send reset link');
      }
    } catch (err) {
      setFormError('An unexpected error occurred');
    }
  };

  if (submitted) {
    return (
      <div className="space-y-4 w-full max-w-md">
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="font-semibold text-green-900 mb-2">Check your email</h3>
          <p className="text-sm text-green-700">
            We&apos;ve sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-green-700 mt-2">
            The link will expire in 24 hours. Check your spam folder if you don&apos;t see it.
          </p>
        </div>

        <button
          onClick={() => setSubmitted(false)}
          className="w-full px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
        >
          Try another email
        </button>

        <a
          href="/auth/login"
          className="block text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Login
        </a>
      </div>
    );
  }

  const displayError = formError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFormError(null);
            clearError();
          }}
          disabled={isLoading}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="john@example.com"
        />
      </div>

      <p className="text-sm text-gray-600">
        Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
      </p>

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
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </button>

      <a
        href="/auth/login"
        className="block text-center text-sm text-blue-600 hover:underline"
      >
        Back to Login
      </a>
    </form>
  );
}

/**
 * Example Reset Password Component
 * 
 * Usage:
 * <ResetPasswordForm token="reset_token_from_url" />
 */
export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const { resetPassword, isLoading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError(null);
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.password) {
      setFormError('Password is required');
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
      const response = await resetPassword({
        token,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else {
        setFormError(response.error || 'Password reset failed');
      }
    } catch (err) {
      setFormError('An unexpected error occurred');
    }
  };

  if (success) {
    return (
      <div className="space-y-4 w-full max-w-md">
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="font-semibold text-green-900 mb-2">Password reset successful!</h3>
          <p className="text-sm text-green-700">
            Your password has been reset. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  const displayError = formError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          New Password
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
        <p className="text-xs text-gray-500 mt-1">
          At least 8 characters
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
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
        {isLoading ? 'Resetting password...' : 'Reset Password'}
      </button>
    </form>
  );
}

/**
 * Example Profile Image Upload Component
 * 
 * Usage:
 * <ProfileImageUpload />
 */
export function ProfileImageUpload() {
  const { uploadProfileImage, user, isLoading, error, clearError } = useAuth();
  
  const [preview, setPreview] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      setFormError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setFormError('Image size must be less than 5MB');
      return;
    }

    setFormError(null);
    clearError();

    // Show preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (file: File) => {
    setUploadSuccess(false);
    setFormError(null);

    try {
      const response = await uploadProfileImage(file);
      if (response.success) {
        setUploadSuccess(true);
        setPreview(null);
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        setFormError(response.error || 'Upload failed');
      }
    } catch (err) {
      setFormError('An unexpected error occurred');
    }
  };

  const handleConfirmUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      await handleUpload(file);
    }
  };

  const displayError = formError || error;

  return (
    <form onSubmit={handleConfirmUpload} className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">
          Profile Picture
        </label>
        
        {/* Current or Preview Image */}
        <div className="mb-3">
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              width={54}
              height={54}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : user?.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt="Current profile"
              width={54}
              height={54}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isLoading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        <p className="text-xs text-gray-500 mt-1">
          JPG, PNG or GIF (max 5MB)
        </p>
      </div>

      {displayError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {displayError}
        </div>
      )}

      {uploadSuccess && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
          ✓ Image uploaded successfully
        </div>
      )}

      {preview && (
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Uploading...' : 'Upload'}
          </button>
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}
