import React from "react";
import PropTypes from "prop-types";
import style from "./TemplateName.module.scss";

const TemplateName = (props) => {
  return (
    <div className={style.TemplateName} data-testid="TemplateName">
     {props.children}
    </div>
  );
};
TemplateName.propTypes = {
  children:PropTypes.any.isRequired,
};
TemplateName.defaultProps = {
  children:<div>Children absents</div>
};

export default TemplateName;
