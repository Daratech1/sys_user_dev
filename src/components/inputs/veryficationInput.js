import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import ReactCodeInput from "react-code-input";
import Button from "@mui/material/Button";
import { sendCode } from "../../action/mobileCode";
import { connect } from "react-redux";

const VerfyCode = ({ checkValidCode,sendCode,phone }) => {
  const [isPinCodeValid, setIsPinCodeValid] = useState(true);
  const [pinCode, setPinCode] = useState("");
  const [btnIsPressed, setBtnIsPressed] = useState(false);
  const [seconds,setSeconds] = useState(60)
  const [showFuc,setShowFuc] = useState(false)
 

  const handlePinChange = pinCode => {
    setPinCode(pinCode);
    checkValidCode(pinCode)
    setBtnIsPressed(false);
  };
  useEffect(()=>{
    timer()
  },[seconds])
  const tick =()=>{
    if (seconds > 0) {
      setSeconds(seconds - 1)
    } else {
      setSeconds(60)
      setShowFuc(!showFuc)  
    }
  }
  const timer =()=>{
    setTimeout(function () {
     tick()
  }, 1000);
 }
 const sendAgain = ()=>{
   setShowFuc(!showFuc)
   sendCode(phone)
   timer()
 }

  return (
    <div className="message-box">
      <Typography component="h5" variant="h5" align="center">
        أدخل رمز التأكيد
      </Typography>
      <Typography variant="subtitle1" align="center">
        لقد أرسلنا لك رمز التأكيد الى رقم الجوال المسجل لدينا
      </Typography>
      <Typography variant="subtitle1" align="center">
         {phone.replace(/.(?=.{4,}$)/g, '*')}
      </Typography>
      <ReactCodeInput
        id="pinCode"
        type="text"
        isValid={isPinCodeValid}
        fields={4}
        onChange={handlePinChange}
        value={pinCode}
      />
     <label>{!isPinCodeValid && btnIsPressed && "Not valid"}</label>
     <Typography variant="subtitle4" align="center">
        <p style={{fontSize:"2rem"}}>
        {
          !showFuc && seconds
        } 
        </p>
        {showFuc && 
        <Button
        variant="contained"
        onClick={sendAgain}
        sx={{ mt: 3, ml: 1 }}
      > إعادة إرسال رمز التحقق </Button>}
      </Typography>
    </div>
  );
};
VerfyCode.propTypes = {
  checkValidCode: PropTypes.func,
};

export default connect(null, { sendCode })(VerfyCode);