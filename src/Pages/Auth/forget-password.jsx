import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SiteButton from '../../Components/Button/button';
import SiteInput from '../../Components/Input/input';
import { UserLayout } from '../../Components/Layout';
import Loader from '../../Components/Loader';
import { useForgetPasswordMutation, useResetPasswordMutation, useVerifyOtpMutation } from '../../Redux/Services/Auth';
import './index.css';

const RESEND_COOLDOWN = 60; // seconds

const ForgetPassword = () => {
    // FIX #1: navigate declared at top — before any useEffect that uses it
    const navigate = useNavigate();

    const [eyeIcon2, seteyeIcon2] = useState(faEyeSlash);
    const [passwordType2, setPasswordType2] = useState(0);
    const toggleIcon2 = () => {
        seteyeIcon2(prev => prev === faEyeSlash ? faEye : faEyeSlash);
        setPasswordType2(prev => prev === 0 ? 1 : 0);
    };

    const [eyeIcon3, seteyeIcon3] = useState(faEyeSlash);
    const [passwordType3, setPasswordType3] = useState(0);
    const toggleIcon3 = () => {
        seteyeIcon3(prev => prev === faEyeSlash ? faEye : faEyeSlash);
        setPasswordType3(prev => prev === 0 ? 1 : 0);
    };

    const [step, setStep] = useState(1);
    // Store email across steps so we can resend and reset password
    const emailRef = useRef('');

    // FIX #4: Resend cooldown timer
    const [resendCooldown, setResendCooldown] = useState(0);
    useEffect(() => {
        if (resendCooldown <= 0) return;
        const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [resendCooldown]);

    const [forget, { data: forgetData, isSuccess: forgotSuccess, isLoading: forgetLoading }] = useForgetPasswordMutation();
    const [verify, { data: verifyData, isSuccess: verifySuccess, isLoading: verifyLoading }] = useVerifyOtpMutation();
    const [setPassword, { data: setPasswordData, isSuccess: setPasswordSuccess, isLoading: setPasswordLoading }] = useResetPasswordMutation();

    const { control: forgetControl, handleSubmit: forgetHandleSubmit, getValues: forgetGetValues } = useForm({ defaultValues: { email: '' } });
    const { control: verifyControl, handleSubmit: verifyHandleSubmit, formState: { errors: verifyErrors } } = useForm({ defaultValues: { otp: '' } });
    const { control: setPasswordControl, handleSubmit: setPasswordHandleSubmit, watch: watchPassword, formState: { errors: passwordErrors } } = useForm({ defaultValues: { password: '', confirm_password: '' } });

    useEffect(() => {
        if (forgotSuccess) {
            toast.success(forgetData?.message || 'Verification code sent to your email');
            setStep(2);
            setResendCooldown(RESEND_COOLDOWN);
        }
    }, [forgotSuccess]);

    useEffect(() => {
        if (verifySuccess) {
            toast.success(verifyData?.message || 'OTP verified');
            setStep(3);
        }
    }, [verifySuccess]);

    // FIX #1: navigate is now declared above — no crash
    useEffect(() => {
        if (setPasswordSuccess) {
            toast.success(setPasswordData?.message || 'Password reset successfully');
            navigate('/login');
        }
    }, [setPasswordSuccess]);

    const onSubmitForget = useCallback((data) => {
        emailRef.current = data.email;
        forget(data);
    }, [forget]);

    const onSubmitVerify = useCallback((data) => {
        verify({ email: emailRef.current, otp: data.otp });
    }, [verify]);

    const onSubmitSetPassword = useCallback((data) => {
        setPassword({ email: emailRef.current, password: data.password });
    }, [setPassword]);

    // FIX #4: Resend code — calls the forget-password endpoint again
    const onResendCode = useCallback(() => {
        if (resendCooldown > 0 || !emailRef.current) return;
        forget({ email: emailRef.current });
    }, [forget, resendCooldown]);

    const renderSteps = () => {
        switch (step) {
            case 1:
                return (
                    <div className='w-100'>
                        <p className="l-grey-text mb-0 text-center">Enter your email address to receive a verification code</p>
                        <form className="mt-3">
                            <Controller
                                name='email'
                                control={forgetControl}
                                rules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Please enter a valid email address'
                                    }
                                }}
                                render={({ field, fieldState }) => (
                                    <SiteInput
                                        placeholder="Enter Email Address"
                                        type="email"
                                        label="Email Address"
                                        requiredStar
                                        error={fieldState.error?.message}
                                        {...field}
                                    />
                                )}
                            />
                            <div className="text-center mt-4">
                                <SiteButton onClick={forgetHandleSubmit(onSubmitForget)} className="w-100 filled-btn rounded">Continue</SiteButton>
                                <Link to="/login" className="text-danger d-block mt-3 mb-3">Back To Login</Link>
                            </div>
                        </form>
                    </div>
                );

            case 2:
                return (
                    <div className='w-100'>
                        {/* FIX #3: Correct digit count — backend generates 4-digit OTP */}
                        <p className="l-grey-text mb-0 text-center">Please check your email for the verification code. Your code is <strong>4 digits</strong> in length.</p>
                        <form className="mt-3">
                            <Controller
                                name='otp'
                                control={verifyControl}
                                rules={{
                                    required: 'Verification code is required',
                                    // FIX #2: Correct validator — numeric, exactly 4 digits
                                    pattern: {
                                        value: /^\d{4}$/,
                                        message: 'Please enter the 4-digit code from your email'
                                    }
                                }}
                                render={({ field, fieldState }) => (
                                    <SiteInput
                                        placeholder="Enter 4-digit code"
                                        label="Verification Code"
                                        requiredStar
                                        type="number"
                                        error={fieldState.error?.message}
                                        {...field}
                                    />
                                )}
                            />
                            {/* FIX #4: Resend Code button is now wired up */}
                            <div className="text-end">
                                <button
                                    className="transparent-btn l-grey-text p-sm underline mt-2"
                                    type='button'
                                    onClick={onResendCode}
                                    disabled={resendCooldown > 0 || forgetLoading}
                                >
                                    {resendCooldown > 0 ? `Resend Code (${resendCooldown}s)` : 'Resend Code'}
                                </button>
                            </div>
                            <div className="text-center mt-4">
                                <SiteButton onClick={verifyHandleSubmit(onSubmitVerify)} className="w-100 filled-btn rounded">Continue</SiteButton>
                                <Link to="/login" className="text-danger d-block mt-3 mb-3">Back To Login</Link>
                            </div>
                        </form>
                    </div>
                );

            case 3:
                return (
                    <div className='w-100'>
                        <p className="l-grey-text mb-0 text-center">Enter your new password</p>
                        <form>
                            <div className="mt-3">
                                <Controller
                                    name='password'
                                    control={setPasswordControl}
                                    rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
                                    render={({ field, fieldState }) => (
                                        <SiteInput
                                            label="New Password"
                                            requiredStar
                                            type={passwordType2 === 0 ? 'password' : 'text'}
                                            placeholder="Enter New Password"
                                            iconFunction={toggleIcon2}
                                            pass
                                            eyeIcon={eyeIcon2}
                                            error={fieldState.error?.message}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            <div className="mt-4">
                                <Controller
                                    name='confirm_password'
                                    control={setPasswordControl}
                                    rules={{
                                        required: 'Please confirm your password',
                                        // FIX: validate passwords match
                                        validate: val => val === watchPassword('password') || 'Passwords do not match'
                                    }}
                                    render={({ field, fieldState }) => (
                                        <SiteInput
                                            label="Confirm New Password"
                                            requiredStar
                                            type={passwordType3 === 0 ? 'password' : 'text'}
                                            placeholder="Confirm New Password"
                                            iconFunction={toggleIcon3}
                                            pass
                                            eyeIcon={eyeIcon3}
                                            error={fieldState.error?.message}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            <div className="text-center mt-4">
                                <SiteButton type="button" className="w-100 mt-3 filled-btn rounded" onClick={setPasswordHandleSubmit(onSubmitSetPassword)}>Update Password</SiteButton>
                                <Link to="/login" className="text-danger d-block mt-3 mb-3">Back To Login</Link>
                            </div>
                        </form>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <UserLayout>
            <section className="auth-bg">
                <Loader loading={forgetLoading || verifyLoading || setPasswordLoading} />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <div className="auth-card-inner">
                                    <h4 className='text-center'>Password Recovery</h4>
                                    {renderSteps()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    );
};

export default ForgetPassword;
