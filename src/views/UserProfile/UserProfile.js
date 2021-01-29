import React, { useState } from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js"
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import axios from 'axios';

const API_URL = 'https://dev.specialisedjobs.com:8080/jdbuilder';

const styles = theme =>( {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },

  rolesDropdown:{
    marginTop:45,
  },
  titleContainer:{
    paddingTop:25,
    width:"100%",
    display:"inline-flex"
  },
  experienceRow:{
    paddingTop:20,
  },
  roleWeightageWrapper:{
    paddingTop:27,
  },
  responsibiltyWeightageWrapper:{
    paddingTop:27,
  },
  sumaryWeightageWrapper:{
    paddingTop:27,
  },
  roleAddButton:{
    paddingTop:25,
    "& button":{
      width:"100%"
    }
  },
  resAddButton:{
    paddingTop:25,
    "& button":{
      width:"100%"
    }
  },
  summaryAddButton:{
    paddingTop:25,
    "& button":{
      width:"100%"
    }
  }

});



class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jobtitle: [],
      jobspecialization: [],
      experience: [],
      roles: [
        {
          title: "",
          weightage: ""
        }
      ],
    }
  }

  addRole() {
    this.setState({
      roles: [...this.state.roles, ""]
    })
  
  }
  
  handleAddRole = event => {
    const newRole = {
      title: this.state.roles.title,
      weightage: this.state.roles.weightage

    };
      this.setState({
        newsRole: ''
      })
  }


  handleJobTitleChange(e) {
    this.setState({ jobtitle: this.state.jobtitle })
    console.log(this.state.jobTitle)
  }

  handleSpecilaizationChange(e) {
    this.setState({ jobspecialization:this.state.jobspecialization })
  }


  handleRoleInputChange(e, index) {
    this.state.roles[index] = e.target.value
    this.setState({
      roles: this.state.roles
    })
  }


  handleSubmit(e) {
    console.log(this.state, '$$$')
  }


 
  updateSpecialization = (item) => {
    this.setState({
      jobspecialization: [...item.specializations]
    })

  }
  componentDidMount() {
    const url = `${API_URL}//Landing`;
    axios.get(url).then(response => response.data)
      .then((data) => {
        this.setState({ jobtitle: data })
        console.log(this.state.jobtitle)
      })
  }

  render() {


    const { classes } = this.props;
    const {
      experience,
      weightage

    } = this.props;




    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>

            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add New Template</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="TITLE"
                      id="template-title"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>


                <GridContainer >
                  <div className={classes.titleContainer}>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>Job Title</InputLabel>
                    <Select
                      labelId="jobTitle"
                      id="jobTitle"
                      className={classes.dropDown1}
                      fullWidth={true}
                      // onChange={(e) => this.updateSpecialization(e)}
                    >
                      {this.state.jobtitle.map((user, index) => (
                        <MenuItem key={index} value={user.job_title} onClick={() => this.updateSpecialization(user)}>{user.job_title}</MenuItem>
                      ))}

                    </Select>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>Specialization</InputLabel>
                    <Select
                      labelId="jobTitle"
                      id="jobTitle"
                      className={classes.dropDown1}
                      fullWidth={true}
                      onChange={(e) => this.handleSpecilaizationChange(e)}
                    >
                      {this.state.jobspecialization ? this.state.jobspecialization.map((item, index) => (
                        
                          <MenuItem key={index} value={item.spec_title} >{item.spec_title}</MenuItem>
                      
                      )): []}

                    </Select>
                  </GridItem>
                  </div>
                </GridContainer>



                <GridContainer>

                  <GridItem xs={12} sm={12} md={4} >
                    <div className={classes.experienceRow}>
                    <InputLabel>Experience</InputLabel>
                    <Select
                      labelId="jobpecialiazation"
                      id="jobSpecilaization"
                      className={classes.experience}
                      value={experience}
                      fullWidth={true}
                      onChange={this.handleChange3}
                    >
                      <MenuItem value={10}>1-2</MenuItem>
                      <MenuItem value={10}>2-3</MenuItem>
                      <MenuItem value={10}>3-4</MenuItem>

                    </Select>
                    </div>
                  </GridItem>

                </GridContainer>
                <h3 className={classes.cardTitle}>
                  ADD Roles
              </h3>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="Roles"
                      id="template-roles"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <div className={classes.roleWeightageWrapper}>
                  <InputLabel>Weightage</InputLabel>
                    <Select
                      labelId="roleWeightage"
                      id="roleWeightage"
                      className={classes.roleWeightage}
                      value={weightage}
                      fullWidth={true}
                      onChange={this.handleChange3}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>

                    </Select>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <div className={classes.roleAddButton}>
                    <Button onClick={() => this.handleAddRole()}  color="primary" >Add Role</Button>
                    </div>

                  </GridItem>
                </GridContainer>


                <h3 className={classes.cardTitle}>
                  ADD Responsibility
              </h3>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="Responsibility"
                      id="template-responsibility"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                  <div className={classes.responsibiltyWeightageWrapper}>

                  <InputLabel>Weightage</InputLabel>
                    <Select
                      labelId="responsibiltyWeightage"
                      id="responsibiltyWeightage"
                      className={classes.responsibiltyWeightage}
                      value={weightage}
                      fullWidth={true}
                      onChange={this.handleChange3}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>

                    </Select>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                  <div className={classes.resAddButton}>

                    <Button  color="primary">Add Responsibility</Button>
                    </div>

                  </GridItem>
                </GridContainer>

                <h3 className={classes.cardTitle}>
                  ADD Summaries
              </h3>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="Summary"
                      id="template-summary"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                  <div className={classes.sumaryWeightageWrapper}>

                  <InputLabel>Weightage</InputLabel>
                    <Select
                      labelId="sumamryWeightage"
                      id="sumamryWeightage"
                      className={classes.sumamryWeightage}
                      value={weightage}
                      fullWidth={true}
                      onChange={this.handleChange3}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>

                    </Select>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                  <div className={classes.summaryAddButton}>

                    <Button color="primary">Add Summary</Button>
                    </div>

                  </GridItem>
                </GridContainer>


              </CardBody>
              <CardFooter>
                <Button onClick={(e) => this.handleSubmit(e)} color="primary">Add Template</Button>
              </CardFooter>
            </Card>
          </GridItem>

        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)( UserProfile);

