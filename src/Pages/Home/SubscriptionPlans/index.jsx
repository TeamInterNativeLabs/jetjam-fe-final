import React, { useEffect } from "react";
import { useGetPackagesQuery } from "../../../Redux/Services/Packages";
import "./index.css";
import SubscriptionCard from "./SubscriptionCard";
import SiteButton from "../../../Components/Button/button";
import { useNavigate } from "react-router";

// forPublic: true → backend returns subscription plans for customers
// TESTING: Currently showing all monthly plans including the $1 test plan
const SubscriptionPlans = ({ showViewAll }) => {
  // TESTING: Get all packages to see your $1 test plan
  const { data } = useGetPackagesQuery(
    showViewAll ? { page: 1, rowsPerPage: 10 } : {},
    { refetchOnFocus: true }
  );
  const navigate = useNavigate();

  const singlePlan = React.useMemo(() => {
    const list = data?.data ?? [];
    
    // Debug: Log what we're getting from the API
    console.log('All packages from API:', list);
    console.log('Number of packages:', list.length);
    
    // TESTING: Show ALL packages to ensure we see your $1 test plan
    console.log('Showing all packages for testing');
    
    return list; // Show everything for now
    
    // For testing: show all available plans instead of filtering for $9.99 only
    // const monthlyPlans = list.filter(p => String(p?.duration ?? "").toLowerCase().includes("month"));
    // console.log('Filtered monthly plans:', monthlyPlans);
    // return monthlyPlans;
    
    // Original logic (commented out for testing):
    // const monthly = list.find(
    //   (p) => (Number(p?.price) === 9.99 || p?.price === "9.99") && String(p?.duration ?? "").toLowerCase().includes("month")
    // );
    // return monthly ? [monthly] : list.slice(0, 1);
  }, [data?.data]);

  // Only show "View All" if there are more plans than what we're currently showing
  const shouldShowViewAll = showViewAll && (data?.data?.length > singlePlan?.length);

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
