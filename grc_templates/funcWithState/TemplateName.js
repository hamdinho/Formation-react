import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./TemplateName.module.scss";
const initialState = {};

const TemplateName = (props) => {
  const [state, setstate] = useState(initialState);
  return (
    <div className={style.TemplateName} data-testid="TemplateName">
      templateName
    </div>
  );
};
TemplateName.propTypes = {};
TemplateName.defaultProps = {};

export default TemplateName;
