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

const API_URL = 'http://jsonplaceholder.typicode.com';

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



class ViewTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jobtitle: [],
      jobspecialization: [],
      experience: [],
      roles: [
        {
          role: "",
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


  handleJobTitleChange() {

    this.setState({ jobtitle: this.state.jobtitle })
    console.log(this.state.jobTitle)
  }


  handleRoleInputChange(e, index) {
    this.state.roles[index] = e.target.value
    this.setState({
      roles: this.state.roles
    })
  }


  handleRemoveRole(index) {
    this.state.roles.splice(index, 1)
    this.setState({ roles: this.state.roles })
  }

  handleSubmit(e) {
    console.log(this.state, '$$$')
  }


  componentDidMount() {
    const url = `${API_URL}/users/`;
    axios.get(url).then(response => response.data)
      .then((data) => {
        this.setState({ jobtitle: data })
        console.log(this.state.jobtitle)
      })

    const url2 = `${API_URL}/users/`;
    axios.get(url2).then(response => response.data)
      .then((data) => {
        this.setState({ jobspecialization: data })
        console.log(this.state.jobspecialization)
      })
  }

  // handleChange = (event) => {
  //   this.setState({
  //     jobTitle: event.target.value
  //   })
  // };
  // handleChange1 = (event) => {
  //   this.setState({
  //     jobSpecialization: event.target.value
  //   })
  // };
  // handleChange2 = (event) => {
  //   this.setState({
  //     experience: event.target.value
  //   })
  // };

  render() {

    const { classes } = this.props;
    const {
      experience,
      weightage
    } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>

            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Template ID:</h4>
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
                      onChange={(e) => this.handleJobTitleChange(e)}
                    >
                      {this.state.jobtitle.map((user, index) => (


                        <MenuItem key={index} value={user.name}>{user.name}</MenuItem>


                      ))}

                    </Select>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>Specialization</InputLabel>
                    <Select
                      labelId="jobpecialiazation"
                      id="jobSpecilaization"
                      className={classes.dropDown1}

                      fullWidth={true}
                      onChange={this.handleChange1}
                    >
                      {this.state.jobspecialization.map((user) => (

                        <MenuItem value={user.id}>{user.email}</MenuItem>


                      ))}

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
                  Roles
              </h3>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="Role"
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
                    <Button  color="primary">Remove</Button>
                    </div>

                  </GridItem>
                </GridContainer>


                <h3 className={classes.cardTitle}>
                Responsibility
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

                    <Button  color="primary">Remove</Button>
                    </div>

                  </GridItem>
                </GridContainer>

                <h3 className={classes.cardTitle}>
                  Summaries
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

                    <Button color="primary">Remove</Button>
                    </div>

                  </GridItem>
                </GridContainer>


              </CardBody>
              <CardFooter>
                <Button onClick={(e) => this.handleSubmit(e)} color="primary">Update</Button>
                <Button onClick={(e) => this.handleSubmit(e)} color="danger">Delete</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>

</GridItem>

        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)( ViewTemplate);

