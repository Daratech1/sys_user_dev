import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Icon from "@material-ui/core/Icon";
import PaymentIcon from "@material-ui/icons/Payment";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { getPaymentMethode } from "../../action/PaymentMethod";
import {getStudents} from "../../action/students";
import { useLocation, useHistory } from "react-router-dom";
import Payment from "../Payment/Payment";
import Animations from "../LoadingComponent/LoadingComponent";
// ======================================================

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  textStartHead: {
    textAlign: "center",
    borderLeft: "1px solid #ddd",
    paddingTop: "16px !important",
  },
  textStartBody: {
    textAlign: "center",
    borderLeft: "1px solid #ddd",
  },
  button: {
    margin: theme.spacing(1),
  },
  pair_student_name:{
    background: "#fff",
    borderBottom: "1px solid #ddd",
    padding: "20px",
  },
  name:{
    color:"#a3a3a3",
    fontSize:"15px"
  }
}));
// test
const Paybook = ({ getPaymentMethode,getStudents , PaymentData: { PaymentData }  , students:{students} }) => {
  const classes = useStyles();
  let location = useLocation();
  let history = useHistory();
  const [myParam, setMyParam] = useState("");
  const handelTransactionId = (e, eleValone, eleValtwo) => {
    history.push(`/payment/`, {
      transactionId: e,
      studentId: location.state.myParam,
    });
    window.localStorage.setItem("valueone", eleValone);
    window.localStorage.setItem("valuetwo", eleValtwo);
  };

  useEffect(() => {
    setMyParam(location.state.myParam);
    getPaymentMethode(location.state.myParam);
  }, [getPaymentMethode]);
  
  const [val , setVal] = useState(null)
  useEffect(() => {
    getStudents();
  const filtersd = students.filter((ele) => ele.id === parseInt(location.state.myParam));
  setVal(filtersd);
  } , val && val.length > 0 ? [] : [students])
  return (
    <div>
      <div className={classes.pair_student_name}>
      <span >?????? ????????????: </span> <span className={classes.name}>{val && val.length !== 0 ? val[0].student_name: null}</span>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.textStartHead}>????????????</TableCell>
              <TableCell className={classes.textStartHead}>
                ???????????? ????????????????
              </TableCell>
              <TableCell className={classes.textStartHead}>
                ?????? ????????????
              </TableCell>
              <TableCell className={classes.textStartHead}>
                ?????? ??????????
              </TableCell>
              <TableCell className={classes.textStartHead}>?????? ??????????</TableCell>
              <TableCell className={classes.textStartHead}>??????????</TableCell>
              <TableCell className={classes.textStartHead}>????????????????</TableCell>
              <TableCell className={classes.textStartHead}>??????????????</TableCell>
              <TableCell className={classes.textStartHead}>??????????????</TableCell>
              <TableCell className={classes.textStartHead}>????????????</TableCell>
              <TableCell className={classes.textStartHead}>
                ???????????? ??????????
              </TableCell>
              <TableCell className={classes.textStartHead}>
                {" "}
                ?????????? ??????????
              </TableCell>
              <TableCell className={classes.textStartHead}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PaymentData.transactions && PaymentData.success === true ? (
              PaymentData.transactions.map((ele) => (
                <TableRow key={ele.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.textStartBody}
                  >
                    {ele.installment_name}
                  </TableCell>
                  <TableCell className={classes.textStartBody}>
                    {ele.amount_before_discount}
                  </TableCell>
                  <TableCell className={classes.textStartBody}>
                    {" "}
                    {ele.period_discount} ({ele.discount_rate}%)
                  </TableCell>
                  <TableCell className={classes.textStartBody}>
                    {ele.coupon_discount}
                  </TableCell>
                  <TableCell className={classes.textStartBody}>
                    {ele.amount_after_discount}
                  </TableCell>
                  <TableCell className={classes.textStartBody}>
                    {ele.vat_amount}
                  </TableCell> 
                  <TableCell className={classes.textStartBody}>
                    {parseInt(ele.amount_after_discount) + parseInt(ele.vat_amount)}
                  </TableCell> 
                  <TableCell className={classes.textStartBody}>
                    {ele.paid_amount}
                  </TableCell>

                  <TableCell className={classes.textStartBody}>
                    {ele.residual_amount}
                  </TableCell>
                  <TableCell className={classes.textStartBody}>
                    {ele.payment_status == 0 ? "???????????? ??????????" : "???? ??????????"}
                  </TableCell>

                  <TableCell className={classes.textStartBody}>
                    {ele.payment_status == "0" ? ele.payment_due : ""}
                  </TableCell>
                  <TableCell className={classes.textStartBody}>
                    {ele.payment_status == "1" ? ele.payment_date : ""}
                  </TableCell>
                  <TableCell className={classes.textStartBody}>
                    {ele.payment_status == "0" ? (
                      <Button
                        id={ele.id}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<PaymentIcon />}
                        onClick={(e) =>
                          handelTransactionId(
                            ele.id,
                            ele.amount_after_discount,
                            ele.paid_amount
                          )
                        }
                      >
                        <span style={{ margin: "0 5px" }}>????????</span>
                      </Button>
                    ) : (
                      "???? ??????????"
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <>
                <TableCell
                  style={{
                    padding: "50px",
                    textAlign: "center",
                    width: "100%",
                    color: "green",
                  }}
                >
                  {" "}
                  ?????????? ???????? ???????????????? ???? ???????? ...
                </TableCell>
              </>
            )}

            {PaymentData.transactions &&
            PaymentData.transactions.length === 0 ? (
              <TableCell
                style={{
                  padding: "50px",
                  textAlign: "center",
                  width: "100%",
                  color: "red",
                }}
              >
                {" "}
                ???????? ???????????? ???????????? ????????????/??...
              </TableCell>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>

      {!PaymentData.transactions && !PaymentData.success === true ? (
        <div style={{background:"#fff",padding:"10px",boxShadow:"1px 1px 2px #888"}}>
          <Animations />
        </div>
        
      ) : null}
    </div>
  );
};

Paybook.propTypes = {
  getPaymentMethode: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  PaymentData: PropTypes.object,
  students:PropTypes.object,
  date: PropTypes.string,
};

const mapStateToProps = (state) => ({
  PaymentData: state.PaymentData,
  students:state.students,
  date: state.date,
});

export default connect(mapStateToProps, { getPaymentMethode ,getStudents })(Paybook);
