import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@mui/material/Checkbox";
import { useHistory } from "react-router-dom";
import RegularButton from "components/CustomButtons/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import FormControlLabel from "@mui/material/FormControlLabel";

import { makeStyles } from "@material-ui/core/styles";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import InputLabel from "@material-ui/core/InputLabel";

import moment from "moment";
import "moment/locale/ar";
import { fill } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "30%",
  },
  label: {
    color: "#322165",
  },
  pair_Moving: {
    padding: "10px",
    background: "rgb(243 243 243 / 80%)",
    boxShadow: "0px 5px 4px #aaa, 0px 0px 2px #aaa",
  },
  pair_selectbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  removeBefore: {
    border: "1px solid #bbb",
    padding: "5px",
    borderRadius: "10px",
    boxShadow: "0px 2px 4px #999",
    "&:before": {
      display: "none",
    },
  },
}));

const PricingTable = ({
  plans,
  sendPlanInfo,
  transportations,
  appId,
  handleShow,
  applications,
}) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(1);
  const [transportation, setTransportation] = useState(false);
  const [transId, setTransId] = useState(0);
  const [transWay, setTransWay] = useState(0);
  const [transWayValue, setTransWayValue] = useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChoose = (id) => {
    setValue(id);
  };
  const GreenCheckbox = withStyles({
    root: {
      color: "#312163",
      "&$checked": {
        color: "#00ddb1",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const handleTransRequired = (e) => {
    setTransportation(e.target.checked);
  };
  const handleSelectTransType = () => {
    return (
      transportations &&
      transportations.map((item) => (
        <option key={item.id} value={item.id}>
          {item.transportation_type}
        </option>
      ))
    );
  };
  const handleTransType = (e) => {
    setTransId(e.target.value);
  };
  const handleTransWay = (e) => {
    setTransWayValue(e.target.value);

    switch (e.target.value) {
      case "1":
        setTransWay("annual_fees");
        break;
      case "2":
        setTransWay("semester_fees");
        break;
      case "3":
        setTransWay("monthly_fees");
        break;
      default:
        break;
    }
  };

  const handleTransPay = () => {
    const item = transportations.find((o) => o.id == transId);

    if (transId == 0) {
      return null;
    } else {
      return item[transWay];
    }
  };
  const checkStatusApp = () => {
    const result = applications.find((o) => o.id == appId).status_id;
    if (result > 2) {
      return (
        <RegularButton variant="contained" color="primary" disabled>
          ?????? ???????? ???? ?????? ??????????????
        </RegularButton>
      );
    } else {
      return (
        <RegularButton
          variant="contained"
          color="primary"
          disabled={transportation && (!transId || !transWayValue)}
          onClick={() => sendPlan()}
        >
          ??????????
        </RegularButton>
      );
    }
  };
  const sendPlan = () => {
    let final;
    if (transportation) {
      final = {
        plan_id: value,
        transportation_required: transportation ? 1 : 0,
        transportation_id: transId,
        transportation_payment: transWayValue,
      };
    } else {
      final = {
        plan_id: value,
        transportation_required: transportation ? 1 : 0,
      };
    }
    sendPlanInfo(appId, final);
    handleShow();
  };
  return (
    <div className="pricing-table">
      <h2>???????? ?????? ??????????</h2>
      <div className="pricing-items">
        {plans.length > 0 ? (
          plans.map((prop) => (
            <div
              className={`${prop.id == value ? "item active" : "item"}`}
              key={prop.id}
              onClick={() => handleChoose(prop.id)}
            >
              {prop.is_discounted && (
                <div className="discount">
                  <span className="number">{prop.discount_rate}%</span> ??????
                </div>
              )}
              <h4 className="title-item">{prop.plan_name} </h4>
              <ul>
                <li>
                  {/* test test 2 */}
                  <span className="name">???????????? :</span>
                  <span className="value"> {prop.ammount_before_discount}</span>
                </li>
                <li>
                  <span className="name"> ?????? ??????????????:</span>
                  {prop.installments > 1 ?
                    <span className="value"> {prop.installments} </span>
                    :
                    <span className="value"> ???????? ??????????</span>
                  }
                </li>
                {prop.is_discounted && (
                  <>
                    <li>
                      <span className="name">???????????? ?????? ??????????:</span>
                      <span className="value">
                        {" "}
                        {prop.ammount_after_discount}
                      </span>
                    </li>

                    <li>
                      <span className="name"> ???????? ??????:</span>
                      <span className="value">
                        {" "}
                        {moment(prop.Valid_until)
                          .locale("ar")
                          .format("dddd_ ll ")}
                      </span>
                    </li>
                  </>
                )}
              </ul>
              <hr />
              {prop.is_discounted && 
              <div className="money-dis">
                <span>{prop.discount_ammount}</span>
                ?????? / ????
              </div>}
              <div className="select-plan">
                <GreenCheckbox
                  checked={prop.id == value}
                  value={prop.id}
                  onChange={handleChange}
                  name="checkedG"
                />
              </div>
            </div>
          ))
        ) : (
          <CircularProgress color="secondary" />
        )}
      </div>

      <Grid container spacing={1} style={{ alignItems: "flex-end" }}>
        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={transportation}
                onChange={(e) => handleTransRequired(e)}
                name="transportation_required"
                sx={{
                  color: "#2A2666",
                  "&.Mui-checked": {
                    color: "#2A2666",
                  },
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                }}
              />
            }
            label="????????????????  ???? ???????? ??????????"
          />
        </Grid>
        {transportation && (
          <>
            <Grid item xs={4} sm={4}>
              <div className="form-group">
                <label className={classes.label}>???????? ??????????</label>
                <select
                  name="transportation_id"
                  onChange={(e) => handleTransType(e)}
                  value={transId}
                >
                  <option value="0" disabled>
                    ???????? ????????????
                  </option>
                  {handleSelectTransType()}
                </select>
              </div>
            </Grid>
            <Grid item xs={4} sm={4}>
              <div className="form-group">
                <label className={classes.label}>?????????? ???????????? </label>
                <select
                  name="transportation_payment"
                  onChange={(e) => handleTransWay(e)}
                  value={transWayValue}
                >
                  <option value="0" disabled>
                    ???????? ??????????????
                  </option>
                  <option value="1">????????</option>
                  <option value="2">????????</option>
                  <option value="3">????????</option>
                </select>
              </div>
            </Grid>
            {transWay !== 0 ? (
              <Grid item xs={4} sm={4}>
                <Typography
                  component="h6"
                  variant="h6"
                  align="right"
                  style={{ lineHeight: "2.6" }}
                >
                  ?????????? ????????????: {transWay && handleTransPay()}
                </Typography>
              </Grid>
            ) : (
              <></>
            )}
          </>
        )}
      </Grid>

      <div className="plan-action">{checkStatusApp()}</div>
    </div>
  );
};
PricingTable.propTypes = {
  plans: PropTypes.array,
};

export default PricingTable;
