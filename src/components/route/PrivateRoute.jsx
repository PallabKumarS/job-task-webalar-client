import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../shared/useAuth";
import CustomSpinner from "../shared/CustomSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <CustomSpinner></CustomSpinner>;
  } else if (user) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
