import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SiteButton from '../../Components/Button/button';
import SiteInput from '../../Components/Input/input';
import { UserLayout } from '../../Components/Layout';
import Loader from '../../Components/Loader';
import { useLoginMutation } from '../../Redux/Services/Auth';
import './index.css';

const defaultValues = {
    email: '',
    password: ''
}

const Login = () => {

    const [eyeIcon, seteyeIcon] = useState(faEyeSlash)
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

    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!checked);
    };

    const [login, { data, isSuccess, isLoading }] = useLoginMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message)
        }
    }, [isSuccess])

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