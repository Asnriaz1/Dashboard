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
import Table from "components/Table/Table.js";
import CancelIcon from '@material-ui/icons/Cancel';
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
  addSkillContainer:{
    width:"50%"
  },
  titleAddButton:{
    paddingTop:25
  },
  viewSkillContainer:{
    width:"100%"
  },
  viewSkillContainer:{
    width:"80%"
  },
  cancelIcon:{
    color:"#5D33D0"
  }
});

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     width: "25px"
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(5),
//   },
//   MuiSelect: {
//     root: {
//       width: "250px"
//     }
//   },
//   roleAddButton: {
//     marginTop: "35px",
//   },
//   titleContainer:{
//     paddingTop:25
//   }

// }));



class NewJobSpecialization extends React.Component {

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
        <div className={classes.addSkillContainer}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>

            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add New Job Specialisation</h4>
              </CardHeader>
              <CardBody>
           
              <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Job Title"
                      id="jobTitle"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
           
                  <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.titleAddButton}>
                    <Button  color="primary">Add Job Specialisation</Button>
                    </div>

                  </GridItem>
                </GridContainer>

              </CardBody>
           
            </Card>
          </GridItem>

        </GridContainer>
        </div>
        <div className={classes.viewSkillContainer}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>

            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>View Job Specialisation</h4>
              </CardHeader>
              <CardBody>
              <Table
              tableHeaderColor="primary"
              tableHead={["ID", "TITLE","ACTION"]}
              tableData={[
                ["0", ".Net",<CancelIcon className={classes.cancelIcon}/>],
             
              ]}
            />
            

              </CardBody>
           
            </Card>
          </GridItem>

        </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)( NewJobSpecialization);

