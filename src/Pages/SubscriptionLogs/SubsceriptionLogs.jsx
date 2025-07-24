import React, { useState, useMemo } from "react";
import { UserLayout } from "../../Components/Layout";
import SiteTable from "../../Components/SiteTable/SiteTable";
import Loader from "../../Components/Loader";
import { subscriptionHeaders } from "../../Config/Data";
import { useGetSubscriptionsQuery } from "../../Redux/Services/Subscription";
import { formatDate } from "../../Utils/helper";
import "./index.css";
import EmptyComponent from "../../Components/EmptyComponent";
import SiteButton from "../../Components/Button/button";
import { useNavigate } from "react-router-dom";
import TableFilters from "../../Components/TableFilters/TableFilters";

const SubscriptionLogs = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetSubscriptionsQuery(
    {},
    { refetchOnFocus: true }
  );

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    status: "All",
  });

  const onClickSubscriptions = () => {
    navigate("/subscription-plans");
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Apply filter logic
  const filteredData = useMemo(() => {
    let filtered = data?.data || [];

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
                <h4 className="responsive-heading">Subscription Logs</h4>
                <SiteButton className="site-btn" onClick={onClickSubscriptions}>
                  View Subscriptions
                </SiteButton>
              </div>

              {/* Filters */}
              <TableFilters
                fromDate={filters.fromDate}
                toDate={filters.toDate}
                status={filters.status}
                onChange={handleFilterChange}
              />

              {/* Table */}
              <SiteTable
                headers={subscriptionHeaders}
                isEmpty={filteredData?.length <= 0}
              >
                {filteredData?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.method_subscription_id}</td>
                    <td>{item?.package?.title}</td>
                    <td>{formatDate(item?.createdAt)}</td>
                    <td>{formatDate(item?.expiry)}</td>
                    <td>$ {item.package.price}</td>
                    <td>{item.active ? "Active" : "Inactive"}</td>
                  </tr>
                ))}
              </SiteTable>
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default SubscriptionLogs;
