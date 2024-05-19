import PropTypes from "prop-types";

const CustomContainer = ({ children, className }) => {
  return <div className={`container mx-auto ${className}`}>{children}</div>;
};

CustomContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CustomContainer;
