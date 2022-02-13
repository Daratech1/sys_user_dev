import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@mui/material/Checkbox";

const styles = () => ({
  radioContainer: {
    direction: "rtl",
    width: "100%",
    fontFamily: "cairo",
    marginTop: "10px !important",
  },
  labelText: {
    fontFamily: "cairo",
  },
  formBox: {
    direction: "rtl",
  },
});
const useStyles = makeStyles(styles);

const SecondOrderForm = ({
  getTransRequired,
  errors2,
  handleChange2,
  data: { transportations,types,genders,grades,levels },
}) => {
  const classes = useStyles();
  const [customGenders, setCustomGenders] = useState([]);
  const [customGrades, setCustomGrades] = useState([]);
  const [customLevels, setCustomLevels] = useState([]);
  const [transportation, setTransportation] = useState(false);
  const [transId, setTransId] = useState(0);
  const [transWay, setTransWay] = useState(0);
  const [transWayValue,setTransWayValue] = useState(0)

  const getGender = (id) => {
    const result = genders.filter(prop=> prop.type_id == id)
    setCustomGenders(result)
    
  };
  const getGrade = (id) => {
    const result = grades.filter(prop=> prop.gender_id == id)
    setCustomGrades(result)
  };
  const getLevel = (id) => {
   const result =levels.filter(prop=> prop.grade_id == id)
   setCustomLevels(result)
  };

  const handleSelectType = (event) => {
    handleChange2(event);
    getGender(event.target.value);
  };
  const handleSelectGender = (event) => {
    handleChange2(event);
    getGrade(event.target.value);
  };
  const handleSelectGrades = (event) => {
    handleChange2(event);
    getLevel(event.target.value);
  };
  const handleTransRequired = (e) => {
    setTransportation(e.target.checked);
    getTransRequired(e.target.checked);
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
    handleChange2(e);
  };
  const handleTransWay = (e) => {
    setTransWayValue(e.target.value)
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
    console.log(transWayValue)
    handleChange2(e);
  };
  const handleTransPay = () => {
    const item = transportations.find((o) => o.id == transId);
  if (transId == 0) {
    return null
  }else{
    return item[transWay]

  }
  };
  return (
    <div className={classes.formBox}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography component="h1" variant="h4" align="center">
            إستكمال الطلب
          </Typography>
        </Grid>

        <Grid container spacing={1}>
          {types && (
            <>
              <Grid item xs={12} sm={12}></Grid>
              <Grid item xs={6} sm={3}>
                <div className="form-group">
                  <label>مسار التعليم </label>
                  <select name="type_id" onChange={(e) => handleSelectType(e)}>
                    <option value="">إخترالمسار</option>
                    {types.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.type_name}
                      </option>
                    ))}
                  </select>
                  {errors2.type_id && (
                    <small className="error-input">{errors2.type_id}</small>
                  )}
                </div>
              </Grid>
            </>
          )}

          {customGenders.length > 0 && (
            <Grid item xs={6} sm={3}>
              <div className="form-group">
                <label>النوع </label>
                <select
                  name="gender_id"
                  onChange={(e) => handleSelectGender(e)}
                >
                  <option value="">إختر النوع</option>

                  {customGenders.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.gender_name}
                    </option>
                  ))}
                </select>
                {errors2.gender_id && (
                  <small className="error-input">{errors2.gender_id}</small>
                )}
              </div>
            </Grid>
          )}
          {customGrades.length > 0 && (
            <Grid item xs={6} sm={3}>
              <div className="form-group">
                <label>القسم </label>
                <select name="grade_id" onChange={(e) => handleSelectGrades(e)}>
                  <option value="">إختر القسم</option>

                  {customGrades.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.grade_name}
                    </option>
                  ))}
                </select>
                {errors2.grade_id && (
                  <small className="error-input">{errors2.grade_id}</small>
                )}
              </div>
            </Grid>
          )}
          {customLevels.length > 0 && (
            <Grid item xs={6} sm={3}>
              <div className="form-group">
                <label>المرحلة </label>
                <select name="level_id" onChange={(e) => handleChange2(e)}>
                  <option value="">إختر المرحلة</option>

                  {customLevels.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.level_name}
                    </option>
                  ))}
                </select>
                {errors2.level_id && (
                  <small className="error-input">{errors2.level_id}</small>
                )}
              </div>
            </Grid>
          )}

          <Grid item xs={12} sm={12}>
            <hr />
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl
              component="fieldset"
              className={classes.radioContainer}
            >
              <FormLabel className={classes.labelText} component="legend">
                هل يحتاج الطالب الى رعاية
              </FormLabel>
              <RadioGroup row aria-label="gender" name="student_care">
                <FormControlLabel
                  value="1"
                  control={<Radio color="info" />}
                  label="نعم"
                  onChange={(e) => handleChange2(e)}
                />
                <FormControlLabel
                  value="0"
                  control={<Radio color="info" />}
                  label="لا"
                  onChange={(e) => handleChange2(e)}
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={6}>
            <div className="form-group">
              <label> نظام السداد </label>

              <select name="plan_id" onChange={(e) => handleChange2(e)}>
                <option value="">إختر نظام السداد </option>
                <option value="1">سنة دراسية كاملة</option>
                <option value="2"> سداد جزئى</option>
                <option value="3"> تقسيط</option>
              </select>
              {errors2.plan_id && (
                <small className="error-input">{errors2.plan_id}</small>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={12}>
            <hr />
          </Grid>
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
              label="الإشتراك  فى خدمة النقل"
            />
          </Grid>
          {transportation && (
            <>
              <Grid item xs={6} sm={5}>
                <div className="form-group">
                  <label>خدمة النقل</label>
                  <select
                    name="transportation_id"
                    onChange={(e) => handleTransType(e)}
                    value={transId}
                  >
                    <option value="0" disabled>
                      إختر الخدمة
                    </option>
                    {handleSelectTransType()}
                  </select>
                  {errors2.transportation_id && (
                    <small className="error-input">
                      {errors2.transportation_id}
                    </small>
                  )}
                </div>
              </Grid>
              <Grid item xs={6} sm={5}>
                <div className="form-group">
                  <label>طريقة السداد </label>
                  <select
                    name="transportation_payment"
                    onChange={(e) => handleTransWay(e)}
                    value={transWayValue}
                  >
                    <option value="0" disabled>
                      إختر الطريقة
                    </option>
                    <option value="1">سنوي</option>
                    <option value="2">فصلى</option>
                    <option value="3">شهري</option>
                  </select>
                  {errors2.transportation_payment && (
                    <small className="error-input">
                      {errors2.transportation_payment}
                    </small>
                  )}
                </div>
              </Grid>
              {transWay !== 0 ? (
                <Grid item xs={12} sm={12}>
                  <Typography component="h6" variant="h6" align="right">
                    تكلفة الخدمة: {transWay && handleTransPay()}
                  </Typography>
                </Grid>
              ) : (
                <></>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
SecondOrderForm.propTypes = {
  getData: PropTypes.func,
  handleChange2: PropTypes.func,
  data: PropTypes.object,
  errors2: PropTypes.object,
};

const mapStateToProps = (state) => ({
  data: state.data.staticData,
});

export default connect(mapStateToProps, {})(SecondOrderForm);
