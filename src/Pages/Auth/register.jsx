import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SiteButton from '../../Components/Button/button';
import SiteInput from '../../Components/Input/input';
import { UserLayout } from '../../Components/Layout';
import Loader from '../../Components/Loader';
import { useRegisterMutation } from '../../Redux/Services/User';
import { useSendVerificationEmailMutation, useVerifyEmailMutation } from '../../Redux/Services/Auth';
import './index.css';

const RESEND_COOLDOWN = 60;

const defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
}

const Register = () => {
    const navigate = useNavigate();

    const [eyeIcon, seteyeIcon] = useState(faEyeSlash);
    const [passwordType, setPasswordType] = useState(0);
    const toggleIcon = () => {
        seteyeIcon(prev => prev === faEyeSlash ? faEye : faEyeSlash);
        setPasswordType(prev => prev === 0 ? 1 : 0);
    };

    const [eyeIcon2, seteyeIcon2] = useState(faEyeSlash);
    const [passwordType2, setPasswordType2] = useState(0);
    const toggleIcon2 = () => {
        seteyeIcon2(prev => prev === faEyeSlash ? faEye : faEyeSlash);
        setPasswordType2(prev => prev === 0 ? 1 : 0);
    };

    // Step 1 = registration form, Step 2 = OTP verification
    const [step, setStep] = useState(1);
    const emailRef = useRef('');
    const [resendCooldown, setResendCooldown] = useState(0);
    const [otp, setOtp] = useState('');

    useEffect(() => {
        if (resendCooldown <= 0) return;
        const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [resendCooldown]);

    const [register, { data, isSuccess: registerSuccess, isLoading: registerLoading }] = useRegisterMutation();
    const [sendVerification, { isLoading: sendingOtp }] = useSendVerificationEmailMutation();
    const [verifyEmail, { isLoading: verifyingOtp }] = useVerifyEmailMutation();

    const { control, handleSubmit, formState: { errors }, watch } = useForm({ defaultValues });

    // After registration succeeds — send verification email and show OTP step
    useEffect(() => {
        if (registerSuccess) {
            toast.success(data?.message || 'Account created! Please verify your email.');
            sendVerification({ email: emailRef.current });
            setResendCooldown(RESEND_COOLDOWN);
            setStep(2);
        }
    }, [registerSuccess]);

    const onSubmit = useCallback((formData) => {
        emailRef.current = formData.email;
        register(formData);
    }, [register]);

    const onVerify = async () => {
        if (!otp || otp.length !== 4) {
            toast.error('Please enter the 4-digit code from your email');
            return;
        }
        try {
            const result = await verifyEmail({ email: emailRef.current, otp }).unwrap();
            toast.success(result?.message || 'Email verified! You can now log in.');
            navigate('/login');
        } catch (e) {
            toast.error(e?.data?.message || 'Invalid or expired code. Please try again.');
        }
    };

    const onResend = async () => {
        if (resendCooldown > 0) return;
        try {
            await sendVerification({ email: emailRef.current }).unwrap();
            toast.success('Verification code resent to your email');
            setResendCooldown(RESEND_COOLDOWN);
        } catch (e) {
            toast.error(e?.data?.message || 'Failed to resend code');
        }
    };

    if (step === 2) {
        return (
            <UserLayout>
                <section className="auth-bg">
                    <Loader loading={sendingOtp || verifyingOtp} />
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="auth-card">
                                    <div className="auth-card-inner">
                                        <div className="text-center">
                                            <h4>Verify Your Email</h4>
                                            <p className="mb-0 l-grey-text">
                                                We sent a 4-digit code to <strong>{emailRef.current}</strong>. Enter it below to activate your account.
                                            </p>
                                        </div>
                                        <div className="mt-4">
                                            <label className="site-label mb-1">
                                                Verification Code <span className="red-text">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={4}
                                                placeholder="Enter 4-digit code"
                                                className="site-input w-100"
                                                value={otp}
                                                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                            />
                                        </div>
                                        <div className="text-end mt-1">
                                            <button
                                                type="button"
                                                className="transparent-btn l-grey-text p-sm underline"
                                                onClick={onResend}
                                                disabled={resendCooldown > 0 || sendingOtp}
                                            >
                                                {resendCooldown > 0 ? `Resend Code (${resendCooldown}s)` : 'Resend Code'}
                                            </button>
                                        </div>
                                        <div className="mt-4">
                                            <SiteButton className="w-100 filled-btn rounded" onClick={onVerify}>
                                                Verify & Continue
                                            </SiteButton>
                                        </div>
                                        <div className="mt-3 text-center">
                                            <button
                                                type="button"
                                                className="transparent-btn text-danger p-sm"
                                                onClick={() => setStep(1)}
                                            >
                                                ← Back to Sign Up
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </UserLayout>
        );
    }

    return (
        <UserLayout>
            <section className="auth-bg">
                <Loader loading={registerLoading} />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <div className="auth-card-inner">
                                    <div className="text-center">
                                        <h4>Create Account</h4>
                                        <p className="mb-0 l-grey-text">Create Your Account</p>
                                    </div>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mt-3">
                                            <Controller
                                                name='first_name'
                                                control={control}
                                                rules={{ required: "First Name is Required" }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="First Name"
                                                        className="p-sm"
                                                        requiredStar
                                                        placeholder="Enter First Name"
                                                        error={errors?.first_name?.message}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <Controller
                                                name='last_name'
                                                control={control}
                                                rules={{ required: "Last Name is Required" }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="Last Name"
                                                        className="p-sm"
                                                        requiredStar
                                                        placeholder="Enter Last Name"
                                                        error={errors?.last_name?.message}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <Controller
                                                name='email'
                                                control={control}
                                                rules={{
                                                    required: "Email is Required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid Email Address"
                                                    }
                                                }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="Email Address"
                                                        className="p-sm"
                                                        requiredStar
                                                        placeholder="Enter Email Address"
                                                        error={errors?.email?.message}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <Controller
                                                name='password'
                                                control={control}
                                                rules={{ required: "Password is Required", minLength: { value: 6, message: "Minimum 6 characters" } }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="Password"
                                                        className="p-sm"
                                                        pass requiredStar
                                                        placeholder="Enter Password"
                                                        type={passwordType === 0 ? "password" : "text"}
                                                        iconFunction={toggleIcon}
                                                        eyeIcon={eyeIcon}
                                                        error={errors?.password?.message}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <Controller
                                                name='confirm_password'
                                                control={control}
                                                rules={{
                                                    required: "Confirm Password is Required",
                                                    validate: val => val === watch('password') || 'Passwords do not match'
                                                }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="Confirm Password"
                                                        className="p-sm"
                                                        pass requiredStar
                                                        placeholder="Confirm Password"
                                                        type={passwordType2 === 0 ? "password" : "text"}
                                                        iconFunction={toggleIcon2}
                                                        eyeIcon={eyeIcon2}
                                                        error={errors?.confirm_password?.message}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <SiteButton className="w-100 filled-btn rounded" type="submit">Sign Up</SiteButton>
                                        </div>
                                        <div className="mt-4 d-flex justify-content-center align-items-center gap-2">
                                            <p className='mb-0'>Already Have account?</p>
                                            <Link to="/login" className='text-danger no-underline'>Sign In</Link>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    );
};

export default Register;
