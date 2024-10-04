import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import usersGateway from "../gateways/usersGateway";
import useStore from "../store";

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
    }, 1);

    return () => clearTimeout(timer);

  }, []);

  if (loading) return <Loading />;

  return <div>{children}</div>;
};

export default AuthProvider;
