import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SiteButton from '../../Components/Button/button';
import SiteInput from '../../Components/Input/input';
import { UserLayout } from '../../Components/Layout';
import Loader from '../../Components/Loader';
import { useLoginMutation } from '../../Redux/Services/Auth';
import { useSendVerificationEmailMutation } from '../../Redux/Services/Auth';
import './index.css';

const defaultValues = {
    email: '',
    password: ''
}

const Login = () => {

    const [eyeIcon, seteyeIcon] = useState(faEyeSlash)
    const [passwordType, setPasswordType] = useState(0)
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const toggleIcon = () => {
        if (eyeIcon == faEyeSlash) {
            seteyeIcon(faEye)
            setPasswordType(1);
        }
        else {
            seteyeIcon(faEyeSlash);
            setPasswordType(0);
        }
    }

    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!checked);
    };

    const [login, { data, isSuccess, isLoading, isError, error }] = useLoginMutation()
    const [sendVerification, { isLoading: sendingVerification }] = useSendVerificationEmailMutation()
    const [unverifiedEmail, setUnverifiedEmail] = useState(null)

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message)
            const redirect = searchParams.get('redirect');
            if (redirect) {
                navigate(decodeURIComponent(redirect), { replace: true });
            }
        }
    }, [isSuccess])

    // Handle email_unverified response — show resend option instead of generic error
    useEffect(() => {
        if (isError && error?.data?.email_unverified) {
            setUnverifiedEmail(error.data.email)
        }
    }, [isError, error])

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues })

    const onSubmit = useCallback((data) => {
        login(data)
    }, [])

    return (
        <UserLayout>
            <section className="auth-bg">
                <Loader loading={isLoading || sendingVerification} />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <div className="auth-card-inner">
                                    <h4>Sign In your Account</h4>

                                    {/* Email not verified banner */}
                                    {unverifiedEmail && (
                                        <div className="alert alert-warning mt-3 text-center" role="alert">
                                            <p className="mb-2">Your email is not verified. Please check your inbox for the verification code.</p>
                                            <button
                                                type="button"
                                                className="site-btn"
                                                onClick={async () => {
                                                    try {
                                                        await sendVerification({ email: unverifiedEmail }).unwrap()
                                                        toast.success('Verification code resent!')
                                                        navigate(`/register?verify=${encodeURIComponent(unverifiedEmail)}`)
                                                    } catch (e) {
                                                        toast.error(e?.data?.message || 'Failed to resend code')
                                                    }
                                                }}
                                            >
                                                Resend Verification Email
                                            </button>
                                        </div>
                                    )}
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mt-3">
                                            <Controller
                                                name='email'
                                                control={control}
                                                rules={{
                                                    required: "Email is Required"
                                                }}
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
                                                rules={{
                                                    required: "Password is Required"
                                                }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="Password"
                                                        className="p-sm"
                                                        pass requiredStar placeholder="Enter Password"
                                                        type={passwordType == 0 ? "password" : "text"}
                                                        iconFunction={toggleIcon}
                                                        eyeIcon={eyeIcon}
                                                        error={errors?.password?.message}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="d-flex align-items-center mt-3 flex-wrap gap-2 justify-content-between">
                                            <label className="checkbox-container mb-0 me-0"><span>Remember me</span>
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={handleCheckboxChange}
                                                />
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
    )
}

export default Login