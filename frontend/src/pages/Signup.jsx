"use client";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import AuthLoadingScreen from "../components/AuthLoadingScreen";
import AuthCard from "../components/auth/AuthCard";
import GoogleAuthButton from "../components/auth/GoogleAuthButton";
import AuthDivider from "../components/auth/AuthDivider";
import AuthNavigation from "../components/auth/AuthNavigation";
import TermsAndPrivacy from "../components/auth/TermsAndPrivacy";
import EmailPasswordRegisterForm from "../components/auth/EmailPasswordRegisterForm";
import ErrorAlert from "../components/ErrorAlert";

const Signup = () => {
  const navigate = useNavigate();
  const {
    loading,
    authLoading,
    error,
    checkAuth,
    loginWithGoogle,
    clearError,
  } = useAuthStore();

  const handleEmailPasswordSignup = ({ name, email, password }) => {
    useAuthStore
      .getState()
      .signupWithEmailPassword(name, email, password, navigate);
  };

  useEffect(() => {
    checkAuth(() => navigate("/dashboard"));
  }, [navigate, checkAuth]);

  if (loading) {
    return <AuthLoadingScreen />;
  }

  const signupIcon = (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
      />
    </svg>
  );

  const benefits = [
    "Complete expense and income tracking",
    "Beautiful charts and financial reports",
    "Budget management and goal setting",
    "Secure data with Google authentication",
  ];

  return (
    <AuthCard
      icon={signupIcon}
      iconBgColor="bg-green-100"
      iconColor="text-green-600"
      title="Create Account"
      description="Join Personal Finance Assistant and start managing your money"
    >
      {/* Google Signup Button */}
      <GoogleAuthButton
        onClick={loginWithGoogle}
        loading={authLoading}
        loadingText="Creating account..."
      >
        Sign up with Google
      </GoogleAuthButton>

      {/* Error Message */}
      {error && <ErrorAlert error={error} onClose={clearError} />}

      {/* Divider */}
      <AuthDivider text="Get Started Today" />

      {/* Email and Password Signup Form */}
      <EmailPasswordRegisterForm
        onSubmit={handleEmailPasswordSignup}
        loading={authLoading}
      />

      {/* Terms and Privacy */}
      <TermsAndPrivacy />

      {/* Navigation Links */}
      <AuthNavigation
        primaryText="Already have an account?"
        primaryLink="/login"
        primaryLinkText="Sign in here"
      />
    </AuthCard>
  );
};

export default Signup;
