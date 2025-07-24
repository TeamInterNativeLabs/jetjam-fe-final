import React from "react";
import "./index.css";
import TableFilters from "../TableFilters/TableFilters";
import EmptyComponent from "../EmptyComponent";

const SiteTable = ({ headers, children, isEmpty }) => {
  return (
    <>
      <div className="table-responsive mt-4">
        <table className="table custom-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
        {isEmpty && <EmptyComponent />}
      </div>
    </>
  );
};

export default SiteTable;
