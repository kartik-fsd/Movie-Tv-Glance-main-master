import { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(true);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return { loading, showLoading, hideLoading };
};

export default useLoading;
