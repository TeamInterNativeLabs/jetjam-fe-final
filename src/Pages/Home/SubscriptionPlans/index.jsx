import React, { useEffect } from "react";
import { useGetPackagesQuery } from "../../../Redux/Services/Packages";
import "./index.css";
import SubscriptionCard from "./SubscriptionCard";
import SiteButton from "../../../Components/Button/button";
import { useNavigate } from "react-router";

// forPublic: true → backend returns subscription plans for customers
const SubscriptionPlans = ({ showViewAll }) => {
  // Use forPublic=true to get only public-facing plans
  const { data } = useGetPackagesQuery(
    { forPublic: true },
    { refetchOnFocus: true }
  );
  const navigate = useNavigate();

  const singlePlan = React.useMemo(() => {
    const list = data?.data ?? [];
    // Show all monthly plans returned by the backend (forPublic filters to monthly plans)
    return list;
  }, [data?.data]);

  const shouldShowViewAll = showViewAll && false; // forPublic already returns the right set

  const onClickViewAll = () => {
    navigate("/subscription-plans");
  };

  return (
    <section className="subscription-plan pb-sm-5 pb-4">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11 col-12">
            <h4 className="text-center mb-3">Subscription</h4>
            <div className="row subscription-cards-wrapper d-flex justify-content-center align-items-center">
              {singlePlan?.map((item) => (
                <div className={`${singlePlan.length === 1 ? 'col-lg-4' : 'col-lg-6 col-xl-4'} my-3`} key={item._id}>
                  <SubscriptionCard key={item?._id} data={item} />
                </div>
              ))}
            </div>
            {shouldShowViewAll && (
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
