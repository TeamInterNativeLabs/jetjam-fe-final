import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SiteButton from "../../Components/Button/button";
import { UserLayout } from "../../Components/Layout";
import "./index.css";
import { Link } from "react-router-dom";
import { useGetProfileQuery } from "../../Redux/Services/User";
import { formatDate } from "../../Utils/helper";

const Profile = () => {
  const { user } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  useGetProfileQuery(undefined, { refetchOnFocus: true });

  const sub = user?.subscription;
  const isActive = sub?.active === true;
  const isCanceled = !!(sub?.canceledAt || sub?.canceled);
  const endDate = sub?.expiry || sub?.endDate;
  const statusLabel = isActive
    ? isCanceled
      ? `Canceled (access until ${endDate ? formatDate(endDate) : "period end"})`
      : "Active"
    : "Inactive";

  return (
    <UserLayout>
      <section className="beat-mixed-set">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-11 col-12">
              <h4>Profile</h4>
              <div className="profile-card mt-4">
                <h5 className="inter semi-bold">User Information</h5>
                <hr />
                <div className="row">
                  <div className="col-sm-4 my-3">
                    <label htmlFor="" className="semi-bold">
                      First Name
                    </label>
                    <p className="l-grey-text mb-0">{user?.first_name}</p>
                  </div>
                  <div className="col-sm-4 my-3">
                    <label htmlFor="" className="semi-bold">
                      Last Name
                    </label>
                    <p className="l-grey-text mb-0">{user?.last_name}</p>
                  </div>
                  <div className="col-sm-4 my-3">
                    <label htmlFor="" className="semi-bold">
                      Subscription Status
                    </label>
                    <p className="l-grey-text mb-0">
                      {statusLabel}{" "}
                      <Link to="/subscription-logs">(My Subscription)</Link>
                      {" · "}
                      <Link to="/subscription-plans">(View Plans)</Link>
                    </p>
                  </div>
                  {/* <div className="col-sm-4 my-3">
                                        <label htmlFor="" className="semi-bold">Contact Number</label>
                                        <p className="l-grey-text mb-0">{user?.phone}</p>
                                    </div> */}
                  <div className="col-sm-4 my-3">
                    <label htmlFor="" className="semi-bold">
                      Email Address
                    </label>
                    <p className="l-grey-text mb-0">{user?.email}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mt-4 gap-3 flex-wrap">
                  <SiteButton onClick={() => navigate(`/edit-profile`)}>
                    Edit Profile
                  </SiteButton>
                  <SiteButton
                    className="orange-btn"
                    onClick={() => navigate(`/change-password`)}
                  >
                    Change Password
                  </SiteButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default Profile;
