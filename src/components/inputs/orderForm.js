import React, { useEffect } from "react";
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
import { useState } from "react";
import instance from "uitils/api";
import { getDateSlots } from "action/dateSlots";
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
  margin_bottom:{
    marginBottom:"10px !important"
  }
});
const useStyles = makeStyles(styles);

const OrderForm = ({ errors,initialVal,getDateSlots,usedSlotsArry, handleChange, data: { nationalities } }) => {
  const classes = useStyles();
  const handleSlots = (time) => {
    getDateSlots(time)
  };
  const getOpenTime = (event) => {
    handleChange(event);
    handleSlots(event.target.value);
  };

  const handleSelectNationality = () => {
    return (
      nationalities &&
      nationalities.map(prop=> (
        <option key={prop.id} value={prop.id}>
          {prop.nationality_name}
        </option>
      )
    )
    )
  };

  return (
    <div className={classes.formBox}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography component="h1" variant="h4" align="center">
            تقديم طلب
          </Typography>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={6} sm={6}>
            <div className="form-group">
              <label> اسم الطالب رباعي</label>
              <input
                type="text"
                name="student_name"
                onChange={(e) => handleChange(e)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="اسم الطالب رباعي"
                value={initialVal?.student_name}
              />
              {errors.student_name && (
                <small className="error-input">{errors.student_name}</small>
              )}
            </div>
          </Grid>
          <Grid item xs={6} sm={6}>
            <div className="form-group">
              <label>هوية الطالب </label>
              <input
                name="national_id"
                onChange={(e) => handleChange(e)}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="هوية الطالب "
                value={initialVal?.national_id}
              />
              {errors.national_id && (
                <small className="error-input">{errors.national_id}</small>
              )}
            </div>
          </Grid>

          <Grid item xs={6} sm={4}>
            <div className="form-group">
              <label>مكان الميلاد </label>
              <input
                type="text"
                name="birth_place"
                onChange={(e) => handleChange(e)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="مكان الميلاد"
                value={initialVal?.birth_place}
              />
              {errors.birth_place && (
                <small className="error-input">{errors.birth_place}</small>
              )}
            </div>
          </Grid>
          <Grid item xs={6} sm={4}>
            <div className="form-group">
              <label>تاريخ الميلاد </label>
              <input
                type="date"
                name="birth_date"
                onChange={(e) => handleChange(e)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="تاريخ الميلاد"
                value={initialVal?.birth_date}
              />
              {errors.birth_date && (
                <small className="error-input">{errors.birth_date}</small>
              )}
            </div>
          </Grid>
          <Grid item xs={6} sm={4}>
            <div className="form-group">
              <label>الجنسية </label>
              <select name="nationality_id" onChange={(e) => handleChange(e)} value={initialVal?.nationality_id}>
                <option value="">إختر الجنسية</option>
                {handleSelectNationality()}
              </select>
              {errors.nationality_id && (
                <small className="error-input">{errors.nationality_id}</small>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={12}>
            <hr />
          </Grid>
          <Grid item xs={12} sm={4} className={classes.margin_bottom}>
            <div className="form-group">
              <label>تحديد يوم المقابلة </label>
              <input
                type="date"
                name="selected_date"
                onChange={(e) => getOpenTime(e)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="تحديد يوم المقابلة"
                value={initialVal?.selected_date}
              />
              {errors.selected_date && (
                <small className="error-input">{errors.selected_date}</small>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={4}  className={classes.margin_bottom}>
            <div className="form-group">
              <label>تحديد التوقيت بالساعة </label>
              <select name="selected_time" onChange={(e) => handleChange(e)} value={initialVal?.selected_time}>
                <option value="">إختر التوقيت</option>
                {usedSlotsArry.length > 0 ? (
                  usedSlotsArry &&
                  usedSlotsArry.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.time}
                    </option>
                  ))
                ) : (
                  <option value=""> لا يوجد مواعيد متاحة</option>
                )}
              </select>
              {errors.selected_time && (
                <small className="error-input">{errors.selected_time}</small>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={4}  className={classes.margin_bottom}>
            <FormControl
              component="fieldset"
              className={classes.radioContainer}
            >
              <FormLabel className={classes.labelText} component="legend">
                تحديد مكان المقابلة{" "}
              </FormLabel>
              <RadioGroup row aria-label="online" name="online" value={initialVal?.online}>
                <FormControlLabel
                  value="1"
                  control={<Radio color="info" />}
                  label="اون لاين"
                  onChange={(e) => handleChange(e)}
                />
                <FormControlLabel
                  value="0"
                  control={<Radio color="info" />}
                  label="بالمدرسة"
                  onChange={(e) => handleChange(e)}
                />
              </RadioGroup>
              {errors.online && (
                <small className="error-input">{errors.online}</small>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
OrderForm.propTypes = {
  getData: PropTypes.func,
  handleChange: PropTypes.func,
  data: PropTypes.object,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  data: state.data.staticData,
  usedSlotsArry: state.dateSlots.usedSlotsArry
});

export default connect(mapStateToProps, {getDateSlots})(OrderForm);