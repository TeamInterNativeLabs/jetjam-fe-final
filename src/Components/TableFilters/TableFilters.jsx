import React from "react";
import SiteInput from "../Input/input";
import { SiteSelect } from "../Input/select";

const statusOptions = [
  { id: 1, value: "All", option: "All" },
  { id: 2, value: "Active", option: "Active" },
  { id: 3, value: "Inactive", option: "Inactive" },
];

const TableFilters = ({ fromDate, toDate, status, onChange }) => {
  return (
    <div className="table-filters mt-4">
      <div className="d-flex align-items-center gap-3 flex-wrap">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <SiteInput
              label="From Date"
              type="date"
              value={fromDate}
              onChange={(e) => onChange("fromDate", e.target.value)}
              labelClass="d-block"
            />
            <SiteInput
              label="To Date"
              type="date"
              value={toDate}
              onChange={(e) => onChange("toDate", e.target.value)}
              labelClass="d-block"
            />
          </div>
        </div>
        <div className="flex-grow-1">
          <SiteSelect
            items={statusOptions}
            label="Filter by Status"
            value={status}
            onChange={(e) => onChange("status", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
