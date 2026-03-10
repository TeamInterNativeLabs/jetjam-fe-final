import React, { useState, useMemo } from "react";
import { UserLayout } from "../../Components/Layout";
import SiteTable from "../../Components/SiteTable/SiteTable";
import Loader from "../../Components/Loader";
import { subscriptionHeaders } from "../../Config/Data";
import { useGetSubscriptionsQuery, useCancelSubscriptionMutation } from "../../Redux/Services/Subscription";
import { useGetProfileQuery } from "../../Redux/Services/User";
import { formatDate } from "../../Utils/helper";
import "./index.css";
import EmptyComponent from "../../Components/EmptyComponent";
import SiteButton from "../../Components/Button/button";
import { useNavigate } from "react-router-dom";
import TableFilters from "../../Components/TableFilters/TableFilters";

const SubscriptionLogs = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch: refetchSubscriptions } = useGetSubscriptionsQuery(
    {},
    { refetchOnFocus: true, refetchOnMountOrArgChange: true }
  );
  const { refetch: refetchProfile } = useGetProfileQuery(undefined, { 
    refetchOnFocus: true, 
    refetchOnMountOrArgChange: true 
  });
  const [cancelSubscription, { isLoading: isCancelling }] = useCancelSubscriptionMutation();

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    status: "All",
  });

  const subscriptionList = data?.data || [];
  const activeSubscription = subscriptionList.find((s) => s.active);
  const hasActiveSubscription = !!activeSubscription;

  const onClickSubscriptions = () => {
    navigate("/subscription-plans");
  };

  const handleCancelSubscription = async () => {
    if (!activeSubscription?.method_subscription_id && !activeSubscription?._id) return;
    if (!window.confirm("Cancel your subscription? You will keep access until the end of your current billing period, and no future charges will be made.")) return;
    try {
      await cancelSubscription(activeSubscription._id || activeSubscription.method_subscription_id).unwrap();
      refetchSubscriptions();
      refetchProfile();
    } catch (e) {
      console.error("Cancel subscription failed", e);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredData = useMemo(() => {
    let filtered = subscriptionList;

    if (filters.fromDate) {
      filtered = filtered.filter(
        (item) => new Date(item.createdAt) >= new Date(filters.fromDate)
      );
    }

    if (filters.toDate) {
      filtered = filtered.filter(
        (item) => new Date(item.createdAt) <= new Date(filters.toDate)
      );
    }

    if (filters.status !== "All") {
      filtered = filtered.filter((item) =>
        filters.status === "Active" ? item.active : !item.active
      );
    }

    return filtered;
  }, [data, filters]);

  return (
    <UserLayout>
      <Loader loading={isLoading} />
      <section className="beat-mixed-set">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-11 col-12">
              <div className="responsive-header-btn">
                <h4 className="responsive-heading">My Subscription</h4>
                <SiteButton className="site-btn" onClick={onClickSubscriptions}>
                  View Plans
                </SiteButton>
              </div>

              {subscriptionList.length > 0 && (
                <div className="profile-card mt-3 mb-4">
                  <h5 className="inter semi-bold">Current subscription</h5>
                  <hr />
                  <div className="row">
                    <div className="col-md-6 col-lg-3 my-2">
                      <label className="semi-bold small text-uppercase l-grey-text">Plan</label>
                      <p className="mb-0">{activeSubscription?.package?.title ?? "—"}</p>
                    </div>
                    <div className="col-md-6 col-lg-3 my-2">
                      <label className="semi-bold small text-uppercase l-grey-text">Status</label>
                      <p className="mb-0">
                        {activeSubscription
                          ? activeSubscription.canceledAt || activeSubscription.canceled
                            ? "Canceled (access until period end)"
                            : "Active"
                          : "Inactive"}
                      </p>
                    </div>
                    <div className="col-md-6 col-lg-3 my-2">
                      <label className="semi-bold small text-uppercase l-grey-text">Start / Renewal</label>
                      <p className="mb-0">
                        {activeSubscription
                          ? `${formatDate(activeSubscription.createdAt)} / ${formatDate(activeSubscription.expiry) || "—"}`
                          : "—"}
                      </p>
                    </div>
                    <div className="col-md-6 col-lg-3 my-2 d-flex align-items-end">
                      {hasActiveSubscription && !activeSubscription?.canceledAt && !activeSubscription?.canceled && (
                        <SiteButton
                          className="orange-btn"
                          onClick={handleCancelSubscription}
                          disabled={isCancelling}
                        >
                          {isCancelling ? "Cancelling…" : "Cancel subscription"}
                        </SiteButton>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <h5 className="inter semi-bold mt-4">Payment history</h5>
              <TableFilters
                fromDate={filters.fromDate}
                toDate={filters.toDate}
                status={filters.status}
                onChange={handleFilterChange}
              />

              <SiteTable
                headers={subscriptionHeaders}
                isEmpty={filteredData?.length <= 0}
              >
                {filteredData?.map((item, index) => (
                  <tr key={item._id || index}>
                    <td>{item.method_subscription_id || "—"}</td>
                    <td>{item?.package?.title ?? "—"}</td>
                    <td>{formatDate(item?.createdAt)}</td>
                    <td>{formatDate(item?.expiry)}</td>
                    <td>{item?.package ? `$ ${item.package.price}` : "—"}</td>
                    <td>
                      {item.active
                        ? "Active"
                        : item.canceledAt || item.canceled
                        ? "Canceled"
                        : "Inactive"}
                    </td>
                  </tr>
                ))}
              </SiteTable>

              {subscriptionList.length <= 0 && (
                <EmptyComponent message="No subscription history. Subscribe to get access." />
              )}
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default SubscriptionLogs;
