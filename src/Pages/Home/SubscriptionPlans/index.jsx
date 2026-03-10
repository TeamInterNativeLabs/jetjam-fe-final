import React, { useEffect } from "react";
import { useGetPackagesQuery } from "../../../Redux/Services/Packages";
import "./index.css";
import SubscriptionCard from "./SubscriptionCard";
import SiteButton from "../../../Components/Button/button";
import { useNavigate } from "react-router";

// forPublic: true → backend returns only the $9.99/month plan for customers
const SubscriptionPlans = ({ showViewAll }) => {
  const { data } = useGetPackagesQuery(
    showViewAll ? { page: 1, rowsPerPage: 10, forPublic: true } : { forPublic: true },
    { refetchOnFocus: true }
  );
  const navigate = useNavigate();

  const singlePlan = React.useMemo(() => {
    const list = data?.data ?? [];
    const monthly = list.find(
      (p) => (Number(p?.price) === 9.99 || p?.price === "9.99") && String(p?.duration ?? "").toLowerCase().includes("month")
    );
    return monthly ? [monthly] : list.slice(0, 1);
  }, [data?.data]);

  // Only show "View All" if there are multiple plans available
  const shouldShowViewAll = showViewAll && (data?.data?.length > 1);

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
                <div className="col-lg-4 my-3" key={item._id}>
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
