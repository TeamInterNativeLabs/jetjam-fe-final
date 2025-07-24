import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import SiteButton from '../../Components/Button/button';
import SiteInput from '../../Components/Input/input';
import { UserLayout } from '../../Components/Layout';
import { SiteModal } from '../../Components/SiteModal';
import { useCreateFeedbackMutation } from '../../Redux/Services/Feedback';
import { check } from '../../assets';
import './index.css';
import Loader from '../../Components/Loader';

const initial = {
    name: '',
    email: '',
    subject: '',
    message: '',
}

const ContactUs = () => {

    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: initial });
    const [show, setShow] = useState(false);
    const [submit, { isSuccess, isLoading }] = useCreateFeedbackMutation()
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        navigate('/');
    }

    useEffect(() => {
        if (isSuccess) {
            handleShow();
        }
    }, [isSuccess])

    const onSubmit = useCallback((data) => {
        submit(data)
    }, [])

    return (
        <UserLayout>
            <section className="beat-mixed-set">
                <Loader loading={isLoading} />
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-11 col-12">
                            <h4>Contact Us</h4>
                            <div className="profile-card mt-4">
                                <h5 className="inter semi-bold">Contact Us</h5>
                                <hr />
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">
                                        <div className="col-md-6 my-3">
                                            <Controller
                                                control={control}
                                                name='name'
                                                rules={{ required: "Name is required" }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="Full Name"
                                                        labelClass="w-100 mb-2"
                                                        className="p-sm"
                                                        requiredStar
                                                        placeholder="Enter Full Name"
                                                        error={errors?.name?.message}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="col-md-6 my-3">
                                            <Controller
                                                control={control}
                                                name='email'
                                                rules={{
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message: "Please enter a valid email address"
                                                    }
                                                }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="Email"
                                                        labelClass="w-100 mb-2"
                                                        className="p-sm"
                                                        requiredStar
                                                        placeholder="Enter Email"
                                                        error={errors?.email?.message}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="col-md-6 my-3">
                                            <Controller
                                                control={control}
                                                name='subject'
                                                rules={{ required: "Subject is required" }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="Subject"
                                                        labelClass="mb-2"
                                                        className="p-sm"
                                                        requiredStar
                                                        placeholder="Enter Subject"
                                                        error={errors?.subject?.message}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="col-md-6 my-3">
                                            <Controller
                                                control={control}
                                                name='message'
                                                rules={{ required: "Message is required" }}
                                                render={({ field }) => (
                                                    <SiteInput
                                                        label="Message"
                                                        labelClass="mb-2"
                                                        className="p-sm"
                                                        requiredStar
                                                        placeholder="Enter Message"
                                                        error={errors?.message?.message}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mt-4 gap-3 flex-wrap">
                                        <SiteButton type="submit">Submit</SiteButton>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <SiteModal
                show={show}
                handleClose={handleClose}
                noCloseBtn
                modalImg={check}
                modalTitle="Successful!"
                modalText="Form has been submitted successfully."
                normalModal
            />
        </UserLayout >
    );
};

export default ContactUs;
