import { memo } from "react";

const EmptyComponent = (props) => {
  const { message = "No Data Found" } = props;

  return <h5 className="text-center">{message}</h5>;
};

export default memo(EmptyComponent);
