"use client";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import AuthLoadingScreen from "../components/AuthLoadingScreen";
import AuthCard from "../components/auth/AuthCard";
import GoogleAuthButton from "../components/auth/GoogleAuthButton";
import AuthDivider from "../components/auth/AuthDivider";
import AuthNavigation from "../components/auth/AuthNavigation";
import EmailPasswordLoginForm from "../components/auth/EmailPasswordLoginForm";
import ErrorAlert from "../components/ErrorAlert";

const Login = () => {
  const navigate = useNavigate();
  const {
    loading,
    authLoading,
    error,
    checkAuth,
    loginWithGoogle,
    clearError,
  } = useAuthStore();

  const handleEmailPasswordLogin = ({ email, password }) => {
    useAuthStore.getState().loginWithEmailPassword(email, password, navigate);
  };

  useEffect(() => {
    checkAuth(navigate);
  }, [navigate, checkAuth]);

  if (loading) {
    return <AuthLoadingScreen />;
  }

  const loginIcon = (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
      />
    </svg>
  );

  const features = [
    "Track your income and expenses",
    "Generate detailed financial reports",
    "Set and manage budgets",
  ];

  return (
    <AuthCard
      icon={loginIcon}
      iconBgColor="bg-blue-100"
      iconColor="text-blue-600"
      title="Welcome Back"
      description="Sign in to your Personal Finance Assistant"
    >
      {/* Google Login Button */}
      <GoogleAuthButton
        onClick={loginWithGoogle}
        loading={authLoading}
        loadingText="Signing in..."
      >
        Continue with Google
      </GoogleAuthButton>

      {/* Error Message */}
      {error && <ErrorAlert error={error} onClose={clearError} />}

      {/* Divider */}
      <AuthDivider text="Secure Login" />

      <EmailPasswordLoginForm
        onSubmit={handleEmailPasswordLogin}
        loading={authLoading}
      />

      {/* Navigation Links */}
      <AuthNavigation
        primaryText="Don't have an account?"
        primaryLink="/signup"
        primaryLinkText="Sign up here"
      />
    </AuthCard>
  );
};

export default Login;
