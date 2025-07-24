import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SiteButton from '../../Components/Button/button';
import SiteInput from '../../Components/Input/input';
import { UserLayout } from '../../Components/Layout';
import Loader from '../../Components/Loader';
import { useRegisterMutation } from '../../Redux/Services/User';
import './index.css';

const defaultValues = {
    first_name: "",
    last_name: "",
    // phone: "",
    email: "",
    password: "",
    confirm_password: "",
}

const Register = () => {

    const [eyeIcon, seteyeIcon] = useState(faEyeSlash);
    const [passwordType, setPasswordType] = useState(0)

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

    const navigate = useNavigate();
    const [register, { data, isSuccess, isLoading }] = useRegisterMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message)
            navigate('/login')
        }
    }, [isSuccess])

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues })

    const onSubmit = useCallback((data) => {
        register(data)
    }, [])

    return (
        <UserLayout>
            <section className="auth-bg">
                <Loader loading={isLoading} />
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
                                                rules={{
                                                    required: "First Name is Required"
                                                }}
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
                                                rules={{
                                                    required: "Last Name is Required"
                                                }}
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
                                        {/* <div className="mt-3">
                                            <Controller
                                                name='phone'
                                                control={control}
                                                rules={{
                                                    required: "Phone is Required"
                                                }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="Contact Number"
                                                        className="p-sm"
                                                        requiredStar
                                                        placeholder="Enter Contact Number"
                                                        error={errors?.phone?.message}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div> */}
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
                                        <div className="mt-3">
                                            <Controller
                                                name='confirm_password'
                                                control={control}
                                                rules={{
                                                    required: "Confirm Password is Required"
                                                }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="Confirm Password"
                                                        className="p-sm"
                                                        pass requiredStar placeholder="Confirm Password"
                                                        type={passwordType2 == 0 ? "password" : "text"}
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
    )
}

export default Register