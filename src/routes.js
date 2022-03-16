/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import WcIcon from "@material-ui/icons/Wc";
import SettingsIcon from "@material-ui/icons/Settings";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import TableList from "views/TableList/TableList.js";
import Settings from "views/Settings/settings.js"
import Profile from "views/Profile/Profile";
import MyChildren from "views/MyChildren/MyChildren";
import ChildChart from "views/Chart/ChildChart";
import Reports from "views/Reports/Reports";
import AbsenceChart from "views/Chart/calendarChart";
import Payment from "views/Payment/Payment";
import Paybook from "views/paybook/Paybook";
import Permissions from "views/Permissions/Permissions";
import ChangePassWord from "views/ChangePassWord/ChangePassWord";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "الرئيسية",
    icon: Dashboard,
    component: DashboardPage,
    layout: "",
  },
  {
    path: "/student",
    name: "User Profile",
    rtlName: "أبنائى",
    icon: WcIcon,
    component: TableList,
    layout: "",
  },
  
  {
    path: "/father",
    name: "Table List",
    rtlName: "ولى الأمر",
    icon: SupervisorAccountIcon,
    component: DashboardPage,
    layout: "",
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "الدعم الفنى",
    icon: LocalLibraryIcon,
    component: DashboardPage,
    layout: "",
  },
  {
    path: "/settings",
    name: "Settings",
    rtlName: "",
    icon: SettingsIcon,
    component: Settings,
    layout: "",
  },
  {
    path: "/reports",
    name: "",
    rtlName: "أبناء",
    icon: LocalLibraryIcon,
    component: Reports,
    layout: "",
  },
  {
    path: "/profile",
    name: "Profile",
    rtlName: "",
    icon: LocalLibraryIcon,
    component: Profile,
    layout: "",
  },
  {
    path: "/changepassword",
    name: "ChangePassWord",
    rtlName: "",
    icon: LocalLibraryIcon,
    component: ChangePassWord,
    layout: "",
  },
  {
    path: "/children",
    name: "",
    rtlName: "أبناء",
    icon: LocalLibraryIcon,
    component: MyChildren,
    layout: "",
  },
  {
    path: "/childInfo",
    name: "",
    rtlName: "",
    icon: LocalLibraryIcon,
    component: ChildChart,
    layout: "",
  },
  {
    path: "/calenderChart",
    name: "",
    rtlName: "",
    icon: LocalLibraryIcon,
    component: AbsenceChart,
    layout: "",
  },
  {
    path: "/payment",
    name: "",
    rtlName: "",
    icon: LocalLibraryIcon,
    component: Payment,
    layout: "",
  },
  {
    path: "/paybook",
    name: "",
    rtlName: "",
    icon: LocalLibraryIcon,
    component: Paybook,
    layout: "",
  },
  {
    path: "/permissions",
    name: "",
    rtlName: "",
    icon: LocalLibraryIcon,
    component: Permissions,
    layout: "",
  },

];

export default dashboardRoutes;
