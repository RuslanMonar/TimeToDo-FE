import React, { useEffect, useState } from "react";
import useStore from "../store";
import Loading from "../components/Loading";
import usersGateway from "../gateways/usersGateway";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useStore();

  useEffect(() => {
    const checkUserAuth = () => {
        usersGateway.getUser().then((response) => {
          const user  = response.data;
          if (user) {
            setUser({user});
          }
          setLoading(false);
        }).catch(() => setLoading(false));
    };

    //Just to see loader
    const timer = setTimeout(() => {
      checkUserAuth();
    }, 2000);

    return () => clearTimeout(timer);

  }, []);

  if (loading) return <Loading />;

  return <div>{children}</div>;
};

export default AuthProvider;
