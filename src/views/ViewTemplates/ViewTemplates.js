import React, { useState } from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';



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

const API_URL = 'https://dev.specialisedjobs.com:5009/adminpanel';

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
  VisibilityIcon: {
    color: "#5D33D0"
  },
  viewTemplatePopup:{
    background:"black",
    width:800
  },
  dialogpaper: {
    "& .MuiDialog-paper": {
      maxWidth: 1200,
      width: 848
    }
  }

});
class ViewTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: [],
      templatesData: [],
      roles:[],
      open: false

    };

  }
  handleClick(id) {
    
    axios.get('https://dev.specialisedjobs.com:5009/adminpanel/APTemplates?templateid=' + id)
      .then((res) => {
        this.setState({ templatesData: res.data })
        this.setState({roles:res.data.roles})
        this.setState({ open: true });
        console.log(this.state.templatesData)
      })

  }
  popupCloseHandler = () => {
    
    this.setState({open: false });
  };

  handleSubmit(e) {
    console.log(this.state, '$$$')
  }
  componentDidMount() {
    const url = `${API_URL}/APTemplates`;
    axios.get(url).then(response => response.data.data)
      .then((data) => {
        this.setState({ templates: data })
        console.log(this.state.templates)
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
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Experience</TableCell>
                  <TableCell align="left">Short Summary</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.templates ? this.state.templates.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {item.title}
                    </TableCell>
                    <TableCell align="left">
                      {item.exp}
                    </TableCell>
                    <TableCell align="left">
                      {item.short_summary}
                    </TableCell>
                    <TableCell align="left">
                      <VisibilityIcon onClick={(id) => this.handleClick(item.id)} />
                    </TableCell>
                  </TableRow>
                )) : []}
              </TableBody>
            </Table>
          </TableContainer>


            <Dialog
              open={this.state.open}
              //  onClose={handleClose} 
              className={classes.dialogpaper}
              aria-labelledby="form-dialog-title">
              <DialogContent               
              className={classes.viewTemplatePopup}>
                  <Card >
                    <CardHeader color="primary">
                      <h4 className={classes.cardTitleWhite}>Template ID:{this.state.templatesData.id}</h4>
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
                              value={this.state.templatesData.title}
                              className={classes.dropDown1}
                              fullWidth={true}
                              onChange={(e) => this.handleJobTitleChange(e)}
                            >
                              <MenuItem  value={this.state.templatesData.title}>{this.state.templatesData.title}</MenuItem>
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
                              <MenuItem ></MenuItem>
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
                              value={this.state.templatesData.exp}
                              fullWidth={true}
                              onChange={this.handleChange3}
                            >
                              <MenuItem value={this.state.templatesData.exp}>{this.state.templatesData.exp}</MenuItem>
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
                      {
                        this.state.roles ? this.state.roles.map((item, index) => (
                      <GridContainer key={index} >
                        <GridItem xs={12} sm={12} md={8}>
                          <CustomInput
                            labelText="Description"
                            value={item.title}
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
                              value={item.used}
                              fullWidth={true}
                              onChange={this.handleChange3}
                            >
                              <MenuItem value={item.used}>{item.used}</MenuItem>
                              <MenuItem value={10}>10</MenuItem>
                              <MenuItem value={20}>20</MenuItem>
                              <MenuItem value={30}>30</MenuItem>
                            </Select>
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <div className={classes.roleAddButton}>
                            <Button color="primary">Remove</Button>
                          </div>
                        </GridItem>
                      </GridContainer>
                      )) : ""} 
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
                            <Button color="primary">Remove</Button>
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
            
              </DialogContent>
              
              <DialogActions>
                <Button onClick={this.popupCloseHandler} color="primary">
                  Cancel
               </Button>
              </DialogActions>
            </Dialog>

            
        
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(ViewTemplate);

