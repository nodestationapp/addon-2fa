import React, { createContext, useContext, useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { api } from "@nstation/design-system/utils";

import { PageLoader } from "@nstation/design-system";

const TwoFactorAuthMiddlewareContext = createContext();

const TwoFactorAuthMiddlewareProvider = ({ children }) => {
  const {
    data,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["two_factor_auth"],
    queryFn: () => api.get("/admin-api/auth/2fa"),
  });

  const value = useMemo(() => {
    return {
      hasTwoFactorAuth: data?.hasTwoFactorAuth,
      refetch,
    };
    // eslint-disable-next-line
  }, [data]);

  if (!!loading) return <PageLoader />;

  return (
    <TwoFactorAuthMiddlewareContext.Provider value={value}>
      {children}
    </TwoFactorAuthMiddlewareContext.Provider>
  );
};

const useTwoFactorAuthMiddleware = () =>
  useContext(TwoFactorAuthMiddlewareContext);
export { TwoFactorAuthMiddlewareContext, useTwoFactorAuthMiddleware };
export default TwoFactorAuthMiddlewareProvider;
