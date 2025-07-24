import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import SiteButton from '../../Components/Button/button';
import SiteInput from '../../Components/Input/input';
import { UserLayout } from '../../Components/Layout';
import { SiteModal } from '../../Components/SiteModal';
import Loader from '../../Components/Loader';
import { useChangePasswordMutation } from '../../Redux/Services/User';
import { check } from '../../assets';
import './index.css';

const defaultValues = {
    current_password: "",
    new_password: "",
    confirm_password: ""
}

const ChangePassword = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        navigate('/profile');
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Perform your update logic here
    //     handleShow();
    // };

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

    const [changePassword, { isLoading, isSuccess }] = useChangePasswordMutation()

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({ defaultValues })

    useEffect(() => {
        if (isSuccess) {
            handleShow();
        }
    }, [isSuccess])

    const onSubmit = useCallback((data) => {
        changePassword(data)
    }, [])

    return (
        <UserLayout>
            <section className="beat-mixed-set">
                <Loader loading={isLoading} />
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-11 col-12">
                            <h4>Change Password</h4>
                            <div className="profile-card mt-4">
                                {/* <h5 className="inter semi-bold">Change Password</h5>
                                <hr /> */}
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">
                                        <div className="col-md-5 my-3">
                                            <Controller
                                                name='current_password'
                                                control={control}
                                                rules={{
                                                    required: "Current Password is Required"
                                                }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="Current Password"
                                                        className="p-sm mxw-100"
                                                        pass requiredStar placeholder="Enter Current Password"
                                                        type={passwordType == 0 ? "password" : "text"}
                                                        iconFunction={toggleIcon}
                                                        eyeIcon={eyeIcon}
                                                        error={errors?.current_password?.message}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="col-md-5 offset-md-1 my-3">
                                            <Controller
                                                name='new_password'
                                                control={control}
                                                rules={{
                                                    required: "New Password is Required"
                                                }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="New Password"
                                                        className="p-sm mxw-100"
                                                        pass requiredStar placeholder="Enter New Password"
                                                        type={passwordType2 == 0 ? "password" : "text"}
                                                        iconFunction={toggleIcon2}
                                                        eyeIcon={eyeIcon2}
                                                        error={errors?.new_password?.message}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="col-md-5 my-3">
                                            <Controller
                                                name='confirm_password'
                                                control={control}
                                                rules={{
                                                    required: "Confirm Password is Required",
                                                    validate: (val) => {
                                                        if (watch('new_password') != val) {
                                                            return "Your passwords do no match";
                                                        }
                                                    }
                                                }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="Confirm Password"
                                                        className="p-sm mxw-100"
                                                        pass requiredStar placeholder="Confirm Password"
                                                        type={passwordType3 == 0 ? "password" : "text"}
                                                        iconFunction={toggleIcon3}
                                                        eyeIcon={eyeIcon3}
                                                        error={errors?.confirm_password?.message}
                                                        {...field}
                                                    />
                                                )}
                                            />

                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mt-4 gap-3 flex-wrap">
                                        <SiteButton type="submit">Update</SiteButton>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <SiteModal
                show={show}
                handleClose={handleClose}
                noCloseBtn
                modalImg={check}
                modalTitle="Successful!"
                modalText="Password has been updated successfully."
                normalModal
            />
        </UserLayout>
    );
};

export default ChangePassword;
