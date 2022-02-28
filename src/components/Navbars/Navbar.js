import React , {useState , useEffect} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "components/CustomButtons/Button.js";
import ClearAllIcon from '@material-ui/icons/ClearAll';
import Divider from '@material-ui/core/Divider';
import Tooltip from "@material-ui/core/Tooltip";
//hooks
//import { useRouteName } from "hooks";
import { connect } from "react-redux";
import { palette } from '@material-ui/system';
import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";
 import "./navbar.css";
const useStyles = makeStyles(styles);

function Header({rtlActive , handleDrawerToggle , color  , user:{user}}) {
  const classes = useStyles();
  //const routeName = useRouteName();
  // const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });

  const [opennav , setOpennav] = useState(true);

// useEffect(() => {
//   loadUser()
// } , [loadUser])
// console.log(user.guardian.category.color)
  return (
    <>
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <ClearAllIcon className={classes.navIcon} onClick={() => setOpennav(!opennav)}  />
        <div className={ opennav ? classes.flex : classes.opennavIcon}>
          {/* Here we create navbar brand, based on route name */}
          {window.screen.availWidth <= 767 ? <Divider /> : null}
          <Tooltip
            title="سيكون متاح قريبا"
            aria-label="سيكون متاح قريبا"
            placement="top-bottom"
          >
          <Button color="transparent" href="#" className={classes.title} style={{cursor: "no-drop" , color:"#aaa"}}>
             الخدمات
          </Button>
          </Tooltip>
          {window.screen.availWidth <= 767 ? <Divider /> : null}
          <Tooltip
            title="سيكون متاح قريبا"
            aria-label="سيكون متاح قريبا"
            placement="top-bottom"
          >
          <Button color="transparent" href="#" className={classes.title} style={{cursor: "no-drop" , color:"#aaa"}}>
             عن النظام
          </Button>
          </Tooltip>
          {window.screen.availWidth <= 767 ? <Divider /> : null}
          <Tooltip
            title="سيكون متاح قريبا"
            aria-label="سيكون متاح قريبا"
            placement="top-bottom"
          >
          <Button color="transparent" href="#" className={classes.title} style={{cursor: "no-drop" , color:"#aaa"}}>
          رؤيتنا  
         </Button>
         </Tooltip>

         <Tooltip
            title="سيكون متاح قريبا"
            aria-label="سيكون متاح قريبا"
            placement="top-bottom"
          >
         <Button color="transparent" href="#" className={classes.title} style={{cursor: "no-drop" , color:"#aaa"}}>
             أسئلة شائعة
          </Button>
          </Tooltip>
        
          {window.screen.availWidth <= 767 ? <Divider /> : null}
        </div>
        <div className="userStatus">
      <span>
        {user && user.guardian &&  user.guardian.category.category_name}
      </span> 
      <div className={user && user.guardian && user.guardian.category.color}>
        <svg className="bi bi-award-fill"  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"  viewBox="0 0 16 16">
          <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/>
          <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
        </svg>
        </div>
        </div>
        <Hidden smDown implementation="css">
          {rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css" className={classes.borders}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
   
    </>
  );
}
const mapStateToProps = (state) => ({
  user:state.auth,
  date: state.date,
});

Header.propTypes = {
  user:PropTypes.object,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
export default connect(mapStateToProps)(Header);
