import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Add from "@material-ui/icons/Add"

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { NavLink } from 'react-router-dom'


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
        <NavLink to={'/newtemplate'} >
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_paste</Icon>
              </CardIcon>
        
              <h3 className={classes.cardTitle}>
                ADD TEMPLATE
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Add />
                </Danger>
                
              </div>
            </CardFooter>
          </Card>
          </NavLink>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_paste</Icon>
              </CardIcon>
        
              <h3 className={classes.cardTitle}>
                VIEW TEMPLATES
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  
                </Danger>
                <a href="/newtemplate" onClick={e => e.preventDefault()}>
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
    
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>engineering</Icon>
              </CardIcon>
        
              <h3 className={classes.cardTitle}>
                ADD SKILLS
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Add />
                </Danger>
                <a href="admin/newtemplate" onClick={e => e.preventDefault()}>
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>engineering</Icon>
              </CardIcon>
        
              <h3 className={classes.cardTitle}>
                VIEW SKILLS
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                </Danger>
                <a href="/newtemplate" onClick={e => e.preventDefault()}>
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
       
      </GridContainer>
      <GridContainer>
       
       
      </GridContainer>
     
     
    
    </div>
  );
}
