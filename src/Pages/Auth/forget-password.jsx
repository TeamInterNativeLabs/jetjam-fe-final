import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SiteButton from '../../Components/Button/button';
import SiteInput from '../../Components/Input/input';
import { UserLayout } from '../../Components/Layout';
import Loader from '../../Components/Loader';
import { useForgetPasswordMutation, useResetPasswordMutation, useVerifyOtpMutation } from '../../Redux/Services/Auth';
import './index.css';

const ForgetPassword = () => {
    const [eyeIcon2, seteyeIcon2] = useState(faEyeSlash);
    const [passwordType2, setPasswordType2] = useState(0)
    const toggleIcon2 = () => {
        if (eyeIcon2 == faEyeSlash) {
            seteyeIcon2(faEye)
            setPasswordType2(1);
        }
        else {
            seteyeIcon2(faEyeSlash);
            setPasswordType2(0);
        }
    }
    const [eyeIcon3, seteyeIcon3] = useState(faEyeSlash);
    const [passwordType3, setPasswordType3] = useState(0)
    const toggleIcon3 = () => {
        if (eyeIcon3 == faEyeSlash) {
            seteyeIcon3(faEye)
            setPasswordType3(1);
        }
        else {
            seteyeIcon3(faEyeSlash);
            setPasswordType3(0);
        }
    }

    const [step, setStep] = useState(1);

    const [forget, { data: forgetData, isSuccess: forgotSuccess, isLoading: forgetLoading }] = useForgetPasswordMutation()
    const [verify, { data: verifyData, isSuccess: verifySuccess, isLoading: verifyLoading }] = useVerifyOtpMutation()
    const [setPassword, { data: setPasswordData, isSuccess: setPasswordSuccess, isLoading: setPasswordLoading }] = useResetPasswordMutation()

    const { control: forgetControl, handleSubmit: forgetHandleSubmit } = useForm({ defaultValues: { email: "" } })
    const { control: verifyControl, handleSubmit: verifyHandleSubmit } = useForm({ defaultValues: { otp: "" } })
    const { control: setPasswordControl, handleSubmit: setPasswordHandleSubmit } = useForm({ defaultValues: { password: "", confirm_password: "" } })

    useEffect(() => {
        if (forgotSuccess) {
            toast.success(forgetData?.message)
            setStep(step + 1);
        }
    }, [forgotSuccess])

    useEffect(() => {
        if (verifySuccess) {
            toast.success(verifyData?.message)
            setStep(step + 1);
        }
    }, [verifySuccess])

    useEffect(() => {
        if (setPasswordSuccess) {
            toast.success(setPasswordData?.message)
            navigate("/login");
        }
    }, [setPasswordSuccess])

    const onSubmitForget = useCallback(data => {
        forget(data)
    }, [])

    const onSubmitVerify = useCallback(data => {
        verify(data)
    }, [])

    const onSubmitSetPassword = useCallback(data => {
        setPassword(data)
    }, [])

    const renderSteps = () => {
        switch (step) {
            case 1: {
                return (
                    <div className='w-100'>
                        <p className="l-grey-text mb-0 text-center">Enter email address to get a verification code</p>
                        <form action="" className="mt-3">
                            <Controller
                                name='email'
                                control={forgetControl}
                                rules={{
                                    required: "Email is required", pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email address"
                                    }
                                }}
                                render={({ field }) => (
                                    <SiteInput
                                        placeholder="Enter Email Address"
                                        type="email"
                                        label="Email Address"
                                        requiredStar
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
            }
            case 2: {
                return (
                    <div className='w-100'>
                        <p className="l-grey-text mb-0 text-center">Please check your email for verification code. Your code is 6 digits in length</p>
                        <form action="" className="mt-3">
                            <Controller
                                name='otp'
                                control={verifyControl}
                                rules={{
                                    required: "Email is required", pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email address"
                                    }
                                }}
                                render={({ field }) => (
                                    <SiteInput
                                        placeholder="Enter Verification Code"
                                        label="Verification Code"
                                        requiredStar
                                        type="number"
                                        {...field}
                                    />
                                )}
                            />

                            <div className="text-end"><button className="transparent-btn l-grey-text p-sm underline mt-2" type='button'>Resend Code</button></div>
                            <div className="text-center mt-4">
                                <SiteButton onClick={verifyHandleSubmit(onSubmitVerify)} className="w-100 filled-btn rounded">Continue</SiteButton>
                                <Link to="/login" className="text-danger d-block mt-3 mb-3">Back To Login</Link>
                            </div>
                        </form>
                    </div>
                );
            }
            case 3: {
                return (
                    <div className='w-100'>
                        <p className="l-grey-text mb-0 text-center">Change Password</p>
                        <form action="">
                            <div className="mt-3">
                                <Controller
                                    name='password'
                                    control={setPasswordControl}
                                    rules={{ required: "Password is required" }}
                                    render={({ field }) => (
                                        <SiteInput
                                            label="New Password"
                                            requiredStar
                                            type={passwordType2 == 0 ? "password" : "text"}
                                            placeholder="Enter New Password"
                                            iconFunction={toggleIcon2}
                                            pass
                                            eyeIcon={eyeIcon2}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            <div className="mt-4">
                                <Controller
                                    name='confirm_password'
                                    control={setPasswordControl}
                                    rules={{ required: "Confirm Password is required" }}
                                    render={({ field }) => (
                                        <SiteInput
                                            label="Confirm New Password"
                                            requiredStar
                                            type={passwordType3 == 0 ? "password" : "text"}
                                            placeholder="Confirm New Password"
                                            iconFunction={toggleIcon3}
                                            pass
                                            eyeIcon={eyeIcon3}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            <div className="text-center mt-4">
                                <SiteButton type="button" className="w-100 mt-3 filled-btn rounded" onClick={setPasswordHandleSubmit(onSubmitSetPassword)}>Update</SiteButton>
                                <Link to="/login" className="text-danger d-block mt-3 mb-3">Back To Login</Link>
                            </div>
                        </form>
                    </div>
                );
            }
        }
    }

    const navigate = useNavigate();

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
    )
}

export default ForgetPassword