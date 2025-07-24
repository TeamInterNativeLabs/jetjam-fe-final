import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import SiteButton from '../../Components/Button/button';
import SiteInput from '../../Components/Input/input';
import { UserLayout } from '../../Components/Layout';
import { SiteModal } from '../../Components/SiteModal';
import { check } from '../../assets';
import './index.css';
import { useUpdateProfileMutation } from '../../Redux/Services/User';
import Loader from '../../Components/Loader';

const EditProfile = () => {

    const { user } = useSelector(state => state.authSlice)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: user?.first_name || '',
        lastName: user?.last_name || '',
    });

    const [updateProfile, { isSuccess, isLoading }] = useUpdateProfileMutation()

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            handleShow();
        }
    }, [isSuccess])

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        navigate('/profile');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateProfile({
            first_name: formData?.firstName,
            last_name: formData?.lastName
        })

    };

    return (
        <UserLayout>
            <section className="beat-mixed-set">
                <Loader loading={isLoading} />
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-11 col-12">
                            <h4>Edit Profile</h4>
                            <div className="profile-card mt-4">
                                <h5 className="inter semi-bold">User Information</h5>
                                <hr />
                                <Form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 my-3">
                                            <SiteInput
                                                label="First Name"
                                                labelClass="w-100 mb-2"
                                                className="p-sm"
                                                value={formData.firstName}
                                                onChange={(event) => { setFormData({ ...formData, firstName: event.target.value }); }}
                                                requiredStar placeholder="Enter First Name"
                                            />
                                        </div>
                                        <div className="col-md-6 my-3">
                                            <SiteInput
                                                label="Last Name"
                                                labelClass="w-100 mb-2"
                                                className="p-sm"
                                                value={formData.lastName}
                                                onChange={(event) => { setFormData({ ...formData, lastName: event.target.value }); }}
                                                requiredStar placeholder="Enter Last Name"
                                            />
                                        </div>
                                        {/* <div className="col-md-6 my-3">
                                            <SiteInput
                                                label="Contact Number"
                                                labelClass="w-100 mb-2"
                                                className="p-sm"
                                                value={formData.contact}
                                                onChange={(event) => { setFormData({ ...formData, contact: event.target.value }); }}
                                                requiredStar placeholder="Enter Contact Number"
                                            />
                                        </div> */}
                                        <div className="col-md-6 my-3">
                                            <label htmlFor="" className="semi-bold">Email Address</label>
                                            <p className="l-grey-text mb-0">{user?.email}</p>
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
                modalText="Your profile has been updated successfully."
                normalModal
            />
        </UserLayout>
    );
};

export default EditProfile;
