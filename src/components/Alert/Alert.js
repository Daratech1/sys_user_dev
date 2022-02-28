import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const AlertBox = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div style={{marginTop:"10px"}}>
       <Alert variant="filled" key={alert.id} severity={`${alert.alertType}`}>
      <AlertTitle>{alert.alertType === "error" ? "خطأ" : ""}</AlertTitle>
      {alert.msg}
    </Alert>
    </div>
   
  ));

AlertBox.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(AlertBox);
