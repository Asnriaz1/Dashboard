import Dashboard from "@material-ui/icons/Dashboard";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import ViewTemplate from "views/ViewTemplates/ViewTemplates.js";
import NewSkill from "views/NewSkills/NewSkill.js";
import NewJobTitle from "views/NewJobTitle/NewJobTitle.js";
import NewJobSpecialization from "views/NewJobSpecialisation/NewJobSpecialisation";
import Icons from "views/Icons/Icons.js";

// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/newtemplate",
    name: "Add Template",
    icon: "content_paste",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/viewtemplate",
    name: "View Templates",
    icon: "content_paste",
    component: ViewTemplate,
    layout: "/admin"
  },
  {
    path: "/newskill",
    name: "SKills",
    icon: "content_paste",
    component: NewSkill,
    layout: "/admin"
  },
  {
    path: "/jobtitle",
    name: "Job Title",
    icon: "content_paste",
    component: NewJobTitle,
    layout: "/admin"
  },
  {
    path: "/jobspecialization",
    name: "Job Specialization",
    icon: "content_paste",
    component: NewJobSpecialization,
    layout: "/admin"
  },
  


 
  
];

export default dashboardRoutes;
