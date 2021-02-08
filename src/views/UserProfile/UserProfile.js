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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CancelIcon from '@material-ui/icons/Cancel';




const API_URL = 'https://dev.specialisedjobs.com:8080/jdbuilder';
const TemplateApi = 'https://dev.specialisedjobs.com:5009/adminpanel';

const styles = theme => ({
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

  rolesDropdown: {
    marginTop: 45,
  },
  titleContainer: {
    paddingTop: 25,
    width: "100%",
    display: "inline-flex"
  },
  experienceRow: {
    paddingTop: 20,
  },
  roleWeightageWrapper: {
    paddingTop: 27,
  },
  responsibiltyWeightageWrapper: {
    paddingTop: 27,
  },
  sumaryWeightageWrapper: {
    paddingTop: 27,
  },
  roleAddButton: {
    paddingTop: 25,
    "& button": {
      width: "100%"
    }
  },
  resAddButton: {
    paddingTop: 25,
    "& button": {
      width: "100%"
    }
  },
  summaryAddButton: {
    paddingTop: 25,
    "& button": {
      width: "100%"
    }
  },
  viewTemplatePopup: {
    width: 800,
    "& span": {
      fontSize: 22,
      fontWeight: "bold"

    }
  },
  dialogpaper: {
    "& .MuiDialog-paper": {
      maxWidth: 1200,
      width: 848
    }
  },
  tableHeader: {
    fontSize: 20,
    fontWeight: "bold"
  }

});



class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      shortSummary:"",
      jobtitle: [],
      getjobtitle: [],
      jobTitleVal: "",
      jobTitleValID: "",
      jobspecialization: [],
      jobspecializationValue: "",
      jobspecializationValueID: "",
      experience: "",
      roleTextVal: "",
      roleWeightageVal: "",
      roles: [],
      resTextVal: "",
      resWeightageVal: "",
      res: [],
      summaryTextVal: "",
      summaryWeightageVal: "",
      summary: [],
      skillTitle: "",
      skillid: "",
      skillLevel: "",
      skillImportance: "",
      skillWeightage: "",
      skill: [],
      selectedSkill: [],
      selectedJobtitle: "",



      open: false
    }
  }


  submitRoleFormHandler = (event) => {
    let data = {
      // role_id: null,
      title: this.state.roleTextVal,
      used: this.state.roleWeightageVal
    }
    let oldRoles = this.state.roles
    this.setState({
      roles: [...oldRoles, data]
    })

    alert('role added' + this.state.roleTextVal);
    event.preventDefault();
  }

  submitResFormHandler = (event) => {
    let resdata = {
      // respo_id: null,
      title: this.state.resTextVal,
      used: this.state.resWeightageVal
    }
    let oldRes = this.state.res
    this.setState({
      res: [...oldRes, resdata]
    })
    alert('responsibility added' + this.state.resTextVal);
    event.preventDefault();
  }

  submitSummaryFormHandler = (event) => {
    let summarydata = {
      // summary_id: null,
      title: this.state.summaryTextVal,
      used: this.state.summaryWeightageVal
    }
    let oldSummary = this.state.summary
    this.setState({
      summary: [...oldSummary, summarydata]
    })
    alert('summary added' + this.state.summaryTextVal);
    event.preventDefault();
  }

  submitSkillFormHandler = (event) => {
    let skilldata = {

      title: this.state.skillTitle,
      _id: this.state.skillid,
      level: this.state.skillLevel,
      importance: this.state.skillImportance,
      Used: this.state.skillWeightage,
    }
    let oldSkill = this.state.selectedSkill
    this.setState({
      selectedSkill: [...oldSkill, skilldata]
    })
    alert('Skill added:' + this.state.skillTitle);
    debugger
    event.preventDefault();
  }

  handleSkillDelete = (id) => {

    const selectedSkill = [...this.state.selectedSkill];
    const updatedSkill = selectedSkill.filter(item => item.id !== id);
    //update state
    this.setState({ selectedSkill: updatedSkill });

  }
  handleRoleDelete = (id) => {

    const roles = [...this.state.roles];
    const updatedRole = roles.filter(item => item.id !== id);
    //update state
    this.setState({ roles: updatedRole });

  }
  handleResDelete = (id) => {

    const res = [...this.state.res];
    const updatedRes = res.filter(item => item.id !== id);
    //update state
    this.setState({ res: updatedRes });

  }
  handleSummaryDelete = (id) => {

    const summary = [...this.state.summary];
    const updatedSummary = summary.filter(item => item.id !== id);
    //update state
    this.setState({ summary: updatedSummary });

  }



  handleJobTitleChange = (event) => {

    this.setState({ jobTitleValID: event.target.value.id })
    this.setState({ jobTitleVal: event.target.value.job_title })



    // let jobtitleData={
    //   id: this.state.jobTitleVal,
    // }

    // let oldjobTitleVal =this.state.selectedJobtitle
    // this.setState({
    //   selectedJobtitle:[...oldjobTitleVal,jobtitleData]
    // })
  }


  handleSkillChange = (event) => {
    debugger
    this.setState({ skillid: event.target.value._id });
    this.setState({ skillTitle: event.target.value.title })

  }





  handleSpecilaizationChange = (event) => {

    this.setState({ jobspecializationValue: event.target.value.spec_title })
    this.setState({ jobspecializationValueID: event.target.value.spec_id })





  }
  handleExperienceChange = (event) => {
    this.setState({ experience: event.target.value });

  }


  handleRoleChange = (event) => {
    this.setState({ roleTextVal: event.target.value });
    event.preventDefault();

  }
  handleRoleWeighageChange = (event) => {
    this.setState({ roleWeightageVal: event.target.value });
  }

  handleResChange = (event) => {
    this.setState({ resTextVal: event.target.value });
    event.preventDefault();

  }
  handleResWeightageChange = (event) => {
    this.setState({ resWeightageVal: event.target.value });
  }

  handleSummaryChange = (event) => {
    this.setState({ summaryTextVal: event.target.value });
    event.preventDefault();

  }
  handleSummaryWeightageChange = (event) => {
    this.setState({ summaryWeightageVal: event.target.value });
  }


  handleSkillLevelChange = (event) => {
    this.setState({ skillLevel: event.target.value });
  }
  handleSkillImportanceChange = (event) => {
    this.setState({ skillImportance: event.target.value });
  }
  handleskillWeightageChange = (event) => {
    this.setState({ skillWeightage: event.target.value });
  }
  handleTitleChange = (event) => {

    this.setState({ title: event.target.value })
  }

  handleShortSummaryChange  = (event) => {

    this.setState({ shortSummary: event.target.value })
  }


  handlePost = event => {
    const url = `${TemplateApi}/APTemplates`;
    const newtemplate = {
      title: this.state.title,
      short_summary: this.state.shortSummary,
      roles: this.state.roles,
      short_summary: 'sdsdsd',
      responsibilities: this.state.res,
      exp: this.state.experience,
      summary: this.state.summary,
      job_id: this.state.jobTitleValID,
      _skills: this.state.selectedSkill,
      _specializations: [this.state.jobspecializationValueID]

    };
    axios.post(url, newtemplate)
      .then(res => {
      })

    console.log(this.state.jobspecializationValue, '$$$')

    // this.setState({
    //   newtemplate: ''
    // })
  }





  handleSubmit(e) {
    console.log(this.state, '$$$')
  }

  popupOpenHandler = () => {
    this.setState({ open: true });
  }
  popupCloseHandler = () => {

    this.setState({ open: false });
  };




  updateSpecialization = (item) => {
    this.setState({
      jobspecialization: [...item.specializations]
    })

  }
  componentDidMount() {
    const url = `${API_URL}//Landing`;
    axios.get(url).then(response => response.data)
      .then((data) => {
        this.setState({ getjobtitle: data })
        console.log(this.state.getjobtitle)
      })

    const url1 = `${TemplateApi}/APTemplates/skills/`;
    axios.get(url1).then(response => response.data)
      .then((data) => {
        this.setState({ skill: data.data })
        console.log(this.state.skill)
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
                      labelText="Title"
                      id="template-title"
                      value={this.state.value}
                      onChange={this.handleTitleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />

                  </GridItem>
                </GridContainer>
                <GridContainer>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Short Summary"
                      id="template-short-summary"
                      value={this.state.value}
                      onChange={this.handleShortSummaryChange}
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
                        className={classes.jobTitle}
                        fullWidth={true}
                        onChange={this.handleJobTitleChange}
                      >
                        {this.state.getjobtitle.map((user, index) => (
                          <MenuItem key={index} value={user} onClick={() => this.updateSpecialization(user)}>
                            {user.job_title}
                          </MenuItem>
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

                          <MenuItem key={index} value={item} >{item.spec_title}</MenuItem>

                        )) : []}

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
                        fullWidth={true}
                        onChange={this.handleExperienceChange}
                      >
                        <MenuItem value={"1-2"}>1-2</MenuItem>
                        <MenuItem value={"2-3"}>2-3</MenuItem>
                        <MenuItem value={"3-4"}>3-4</MenuItem>

                      </Select>
                    </div>
                  </GridItem>

                </GridContainer>

                <h3 className={classes.cardTitle}>
                  ADD Skills
              </h3>

                <form onSubmit={this.submitSkillFormHandler}>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>

                      <InputLabel>Skill</InputLabel>
                      <Select
                        labelId="jobTitle"
                        id="jobTitle"
                        className={classes.jobTitle}
                        fullWidth={true}

                        onChange={event => this.handleSkillChange(event)}
                      // onChange= {this.handleSkillChange}
                      >
                        {this.state.skill.map((item, index) => (
                          <MenuItem
                            key={index}
                            value={item}
                            name={item.title}
                          >
                            {item.title}
                          </MenuItem>

                        ))}

                      </Select>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <div className={classes.roleWeightageWrapper}>
                        <InputLabel>Level</InputLabel>
                        <Select
                          labelId="skillLevel"
                          id="skillLevel"
                          className={classes.skillLevel}
                          fullWidth={true}
                          onChange={(event) => this.handleSkillLevelChange(event)}
                        >
                          <MenuItem value={"Beginner"}>Beginner</MenuItem>
                          <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                          <MenuItem value={"Expert"}>Expert</MenuItem>
                        </Select>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <div className={classes.roleWeightageWrapper}>
                        <InputLabel>Importance</InputLabel>
                        <Select
                          labelId="skillImportance"
                          id="skillImportance"
                          className={classes.skillImportance}
                          fullWidth={true}
                          onChange={this.handleSkillImportanceChange}
                        >
                          <MenuItem value={"Should Have"}>Should Have</MenuItem>
                          <MenuItem value={"Good to Have"}>Good to Have</MenuItem>
                        </Select>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <div className={classes.roleWeightageWrapper}>
                        <InputLabel>Weightage</InputLabel>
                        <Select
                          labelId="skillWeightage"
                          id="skillWeightage"
                          className={classes.skillWeightage}
                          fullWidth={true}
                          onChange={this.handleskillWeightageChange}
                        >
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                          <MenuItem value={30}>30</MenuItem>
                        </Select>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <div className={classes.roleAddButton}>
                        <Button type="submit" color="primary" >Add Skill</Button>
                      </div>
                    </GridItem>
                  </GridContainer>

                </form>



                <h3 className={classes.cardTitle}>
                  ADD Roles
              </h3>

                <form onSubmit={this.submitRoleFormHandler}>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                      <CustomInput
                        labelText="Roles"
                        id="template-roles"
                        value={this.state.value}
                        onChange={this.handleRoleChange}

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
                          onChange={this.handleRoleWeighageChange}
                        >
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                          <MenuItem value={30}>30</MenuItem>
                        </Select>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <div className={classes.roleAddButton}>
                        <Button type="submit" color="primary" >Add Role</Button>
                      </div>
                    </GridItem>
                  </GridContainer>

                </form>


                <h3 className={classes.cardTitle}>
                  ADD Responsibility
              </h3>
                <form onSubmit={this.submitResFormHandler}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                      <CustomInput
                        labelText="Responsibility"
                        id="template-responsibility"
                        value={this.state.value}
                        onChange={this.handleResChange}
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
                          onChange={this.handleResWeightageChange}
                        >
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                          <MenuItem value={30}>30</MenuItem>

                        </Select>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <div className={classes.resAddButton}>

                        <Button type="submit" color="primary">Add Responsibility</Button>
                      </div>

                    </GridItem>
                  </GridContainer>
                </form>

                <h3 className={classes.cardTitle}>
                  ADD Summaries
              </h3>
                <form onSubmit={this.submitSummaryFormHandler}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                      <CustomInput
                        labelText="Summary"
                        id="template-summary"
                        value={this.state.value}
                        onChange={this.handleSummaryChange}
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
                          onChange={this.handleSummaryWeightageChange}
                          fullWidth={true}

                        >
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                          <MenuItem value={30}>30</MenuItem>

                        </Select>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <div className={classes.summaryAddButton}>

                        <Button type="submit" color="primary">Add Summary</Button>
                      </div>

                    </GridItem>
                  </GridContainer>
                </form>


              </CardBody>
              <CardFooter>
                <Button onClick={(e) => this.handlePost(e)} color="primary">Add Template</Button>
                <Button onClick={(e) => this.popupOpenHandler(e)} color="primary">View</Button>

              </CardFooter>
            </Card>
          </GridItem>

        </GridContainer>

        <Dialog
          open={this.state.open}
          //  onClose={handleClose} 
          className={classes.dialogpaper}
          aria-labelledby="form-dialog-title">
          <DialogContent
            className={classes.viewTemplatePopup} >
            <GridContainer>
              <GridItem lg={6}>
                <p> Title : <span> {this.state.title} </span> </p>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem lg={6}>
                <p> Short Sumamry : <span> {this.state.shortSummary} </span> </p>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem lg={6}>
                <p> Job Title :<span> {this.state.jobTitleVal} </span>  </p>
              </GridItem>
              <GridItem lg={6}>
                <p> Specialization : <span> {this.state.jobspecializationValue} </span> </p>
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem lg={6}>
                <p> Experience : <span>{this.state.experience}</span> </p>
              </GridItem>

            </GridContainer>

            <GridContainer>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">

                  <TableHead >
                    <TableRow>
                      <TableCell className={classes.tableHeader}>Skill</TableCell>
                      <TableCell align="right" className={classes.tableHeader}>Level</TableCell>
                      <TableCell align="right" className={classes.tableHeader}>Importance</TableCell>
                      <TableCell align="right" className={classes.tableHeader}>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {this.state.selectedSkill ? this.state.selectedSkill.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {item.title}
                        </TableCell>
                        <TableCell align="right">
                          {item.level}
                        </TableCell>
                        <TableCell align="right">
                          {item.importance}
                        </TableCell>
                        <TableCell align="right">
                          <CancelIcon onClick={(id) => this.handleSkillDelete(item.id)} />
                        </TableCell>
                      </TableRow>
                    )) : []}
                  </TableBody>
                </Table>
              </TableContainer>
            </GridContainer>



            <GridContainer>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>Role</TableCell>
                      <TableCell align="right" className={classes.tableHeader}>Weightage</TableCell>
                      <TableCell align="right" className={classes.tableHeader}>Action</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.roles ? this.state.roles.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {item.title}
                        </TableCell>
                        <TableCell align="right">
                          {item.used}
                        </TableCell>
                        <TableCell align="right">
                          <CancelIcon onClick={(id) => this.handleRoleDelete(item.id)} />
                        </TableCell>
                      </TableRow>
                    )) : []}
                  </TableBody>
                </Table>
              </TableContainer>
            </GridContainer>
            <GridContainer>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>Responsibility</TableCell>
                      <TableCell align="right" className={classes.tableHeader}>Weightage</TableCell>
                      <TableCell align="right" className={classes.tableHeader}>Action</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.res ? this.state.res.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {item.title}
                        </TableCell>
                        <TableCell align="right">
                          {item.used}
                        </TableCell>
                        <TableCell align="right">
                          <CancelIcon onClick={(id) => this.handleResDelete(item.id)} />
                        </TableCell>
                      </TableRow>
                    )) : []}
                  </TableBody>
                </Table>
              </TableContainer>
            </GridContainer>

            <GridContainer>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>Summary</TableCell>
                      <TableCell align="right" className={classes.tableHeader}>Weightage</TableCell>
                      <TableCell align="right" className={classes.tableHeader}>Action</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.summary ? this.state.summary.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {item.title}
                        </TableCell>
                        <TableCell align="right">
                          {item.used}
                        </TableCell>
                        <TableCell align="right">
                          <CancelIcon onClick={(id) => this.handleSummaryDelete(item.id)} />
                        </TableCell>
                      </TableRow>
                    )) : []}
                  </TableBody>
                </Table>
              </TableContainer>
            </GridContainer>



          </DialogContent>

          <DialogActions>
            <Button onClick={this.popupCloseHandler} color="primary">
              Cancel
               </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);

