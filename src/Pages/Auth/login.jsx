import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SiteButton from '../../Components/Button/button';
import SiteInput from '../../Components/Input/input';
import { UserLayout } from '../../Components/Layout';
import Loader from '../../Components/Loader';
import { useLoginMutation, useSendVerificationEmailMutation, useVerifyEmailMutation } from '../../Redux/Services/Auth';
import './index.css';

const RESEND_COOLDOWN = 60;

const defaultValues = { email: '', password: '' }

const Login = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [eyeIcon, seteyeIcon] = useState(faEyeSlash);
    const [passwordType, setPasswordType] = useState(0);
    const toggleIcon = () => {
        seteyeIcon(prev => prev === faEyeSlash ? faEye : faEyeSlash);
        setPasswordType(prev => prev === 0 ? 1 : 0);
    };

    const [checked, setChecked] = useState(false);

    // Unverified email state — switches the form to OTP verification mode
    const [unverifiedEmail, setUnverifiedEmail] = useState(null);
    const [otp, setOtp] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => {
        if (resendCooldown <= 0) return;
        const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [resendCooldown]);

    const [login, { data, isSuccess, isLoading, isError, error }] = useLoginMutation();
    const [sendVerification, { isLoading: sendingVerification }] = useSendVerificationEmailMutation();
    const [verifyEmail, { isLoading: verifyingOtp, isSuccess: verifySuccess, isError: verifyError, error: verifyErrorData }] = useVerifyEmailMutation();

    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues });

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
            const redirect = searchParams.get('redirect');
            if (redirect) {
                navigate(decodeURIComponent(redirect), { replace: true });
            }
        }
    }, [isSuccess]);

    // When backend returns email_unverified — switch to OTP mode and auto-send code
    useEffect(() => {
        if (isError && error?.data?.email_unverified) {
            const email = error.data.email;
            setUnverifiedEmail(email);
            // Auto-send verification code
            sendVerification({ email }).then(() => {
                setResendCooldown(RESEND_COOLDOWN);
                toast.info('A verification code has been sent to your email.');
            });
        }
    }, [isError, error]);

    // Handle verify email result via useEffect — avoids unwrap() issues
    useEffect(() => {
        if (verifySuccess) {
            toast.success('Email verified! You can now log in.');
            setUnverifiedEmail(null);
            setOtp('');
        }
    }, [verifySuccess]);

    useEffect(() => {
        if (verifyError) {
            toast.error(verifyErrorData?.data?.message || 'Invalid or expired code. Please try again.');
        }
    }, [verifyError]);

    const onSubmit = useCallback((data) => {
        login(data);
    }, [login]);

    const onVerify = () => {
        if (!otp || String(otp).length !== 4) {
            toast.error('Please enter the 4-digit code from your email');
            return;
        }
        verifyEmail({ email: unverifiedEmail, otp: String(otp) });
    };

    const onResend = async () => {
        if (resendCooldown > 0) return;
        try {
            await sendVerification({ email: unverifiedEmail }).unwrap();
            toast.success('Verification code resent to your email');
            setResendCooldown(RESEND_COOLDOWN);
        } catch (e) {
            toast.error(e?.data?.message || 'Failed to resend code');
        }
    };

    // OTP verification screen — shown when email is unverified
    if (unverifiedEmail) {
        return (
            <UserLayout>
                <section className="auth-bg">
                    <Loader loading={sendingVerification || verifyingOtp} />
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="auth-card">
                                    <div className="auth-card-inner">
                                        <div className="text-center">
                                            <h4>Verify Your Email</h4>
                                            <p className="l-grey-text mb-0">
                                                We sent a 4-digit code to <strong>{unverifiedEmail}</strong>.<br />
                                                Enter it below to activate your account.
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
                                                disabled={resendCooldown > 0 || sendingVerification}
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
                                                onClick={() => { setUnverifiedEmail(null); setOtp(''); }}
                                            >
                                                ← Back to Login
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
                <Loader loading={isLoading} />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <div className="auth-card-inner">
                                    <h4>Sign In your Account</h4>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mt-3">
                                            <Controller
                                                name='email'
                                                control={control}
                                                rules={{ required: "Email is Required" }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="Email Address"
                                                        className="p-sm"
                                                        requiredStar
                                                        placeholder="Enter Email Address"
                                                        type="email"
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
                                                rules={{ required: "Password is Required" }}
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
                                        <div className="d-flex align-items-center mt-3 flex-wrap gap-2 justify-content-between">
                                            <label className="checkbox-container mb-0 me-0">
                                                <span>Remember me</span>
                                                <input type="checkbox" checked={checked} onChange={() => setChecked(c => !c)} />
                                                <span className="checkmark"></span>
                                            </label>
                                            <Link to="/reset-password" className='l-grey-text no-underline'>Forgot Password?</Link>
                                        </div>
                                        <div className="mt-4">
                                            <SiteButton className="w-100 filled-btn rounded" type="submit">Log In</SiteButton>
                                        </div>
                                        <div className="mt-4 d-flex justify-content-center align-items-center gap-2">
                                            <p className='mb-0'>New User?</p>
                                            <Link to="/register" className='text-danger no-underline'>Sign Up Now</Link>
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

export default Login;
