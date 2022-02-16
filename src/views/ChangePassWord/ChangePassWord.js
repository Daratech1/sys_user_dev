import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getChangePassword } from "../../action/changePasswordAction";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
    width: "99%",
  },
  pair_fields: {},
  parent: {
    width: "60%",
    margin: "auto",
    background: "#fafafa",
    minHeight: "150px",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "1px 1px 2px #aaa , -1px -1px 2px #ccc",
  },
  pair_button: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },

  pair_input: {
    display: "flex",
    flexFlow: "column",
    marginBottom: "15px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "7px",
  },
}));

const ChangePassWord = ({
  getChangePassword,
  passwordData: { passwordData },
}) => {
  const classes = useStyles();

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const handelchangeOldPass = (e) => {
    setOldPassword(e.target.value);
  };
  const handelchangeNewPass = (e) => {
    setPassword(e.target.value);
  };
  const handelchangeconfirmationPass = (e) => {
    setPassword_confirmation(e.target.value);
  };

  const handelpassClcik = () => {
    if (oldPassword !== "" && password !== "" && password_confirmation !== "") {
      getChangePassword({
        oldPassword: oldPassword,
        password: password,
        password_confirmation: password_confirmation,
      });
    }
  };

  return (
    <div className={classes.parent}>
      <div className={classes.pair_fields}>
        <div className={classes.pair_input}>
          <label>*كلمه المرور الحاليه</label>
          <input
            type="text"
            value={oldPassword}
            className={classes.input}
            placeholder="كلمه المرور الحاليه"
            onChange={handelchangeOldPass}
          />
        </div>

        <div className={classes.pair_input}>
          <label>*كلمه المرور الجديده</label>
          <input
            type="text"
            value={password}
            className={classes.input}
            placeholder="كلمه المرور الجديده"
            onChange={handelchangeNewPass}
          />
        </div>

        <div className={classes.pair_input}>
          <label> *تأكيد كلمه المرور الجديده </label>
          <input
            type="text"
            value={password_confirmation}
            className={classes.input}
            placeholder="تأكيد كلمه المرور الجديده"
            onChange={handelchangeconfirmationPass}
          />
        </div>
      </div>

      <div className={classes.massage}>
        <p style={{ color: "red" }}>
          {passwordData.data && passwordData.data.errors.oldPassword}
        </p>

        <p style={{ color: "red" }}>
          {passwordData.data &&
            passwordData.data.errors.password &&
            passwordData.data.errors.password[0]}
        </p>

        <p style={{ color: "green" }}>{passwordData && passwordData.message}</p>
      </div>

      <div className={classes.pair_button}>
        <Button variant="contained" color="primary" onClick={handelpassClcik}>
          تفيير  كلمه المرور
        </Button>
      </div>
    </div>
  );
};

ChangePassWord.propTypes = {
  getChangePassword: PropTypes.func.isRequired,
  date: PropTypes.string,
};

const mapStateToProps = (state) => ({
  passwordData: state.passwordData,
});

export default connect(mapStateToProps, { getChangePassword })(ChangePassWord);
