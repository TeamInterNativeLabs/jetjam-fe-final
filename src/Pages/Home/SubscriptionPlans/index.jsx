import React from "react";
import { useGetPackagesQuery } from "../../../Redux/Services/Packages";
import "./index.css";
import SubscriptionCard from "./SubscriptionCard";
import SiteButton from "../../../Components/Button/button";
import { useNavigate } from "react-router";

const SubscriptionPlans = ({ showViewAll }) => {
  const { data } = useGetPackagesQuery(
    showViewAll ? { page: 1, rowsPerPage: 3 } : {},
    { refetchOnFocus: true }
  );
  const navigate = useNavigate();

  const onClickViewAll = () => {
    navigate("/subscription-plans");
  };

  return (
    <section className="subscription-plan pb-sm-5 pb-4">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11 col-12">
            <h4 className="text-center mb-3">Subscription plans</h4>
            <div className="row subscription-cards-wrapper d-flex justify-content-center align-items-center">
              {data?.data?.map((item) => (
                <div className="col-lg-4 my-3" key={item._id}>
                  <SubscriptionCard key={item?._id} data={item} />
                </div>
              ))}
            </div>
            {showViewAll && (
              <div className="d-flex justify-content-center align-items-center">
                <SiteButton
                  className="align-self-center"
                  onClick={onClickViewAll}
                >
                  View All
                </SiteButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
