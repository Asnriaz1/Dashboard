import React, { useState } from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// import Table from "components/Table/Table.js";
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const API_URL = 'https://dev.specialisedjobs.com:5009/adminpanel/APTemplates';

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
  addSkillContainer: {
    width: "50%"
  },
  skillAddButton: {
    paddingTop: 25
  },
  viewSkillContainer: {
    width: "80%"
  },
  cancelIcon: {
    color: "#5D33D0"
  }
});

class NewSkill extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      skills: [
        {
          id: "",
          title: ""
        }
      ],
      newskill: ''
    }
  }

  componentDidMount() {
    const url = `${API_URL}/skills/`;
    
    axios.get(url).then(response => response.data)
      .then((data) => {
        debugger
        this.setState({ skills: data })
        console.log(this.state.skills)
      })

  }


  textChangeHandler = e => {
    this.setState({
      newskill: e.target.value
    })
  }


  handlePost = event => {
    const url = `${API_URL}/skills/`;
    const newSkills = {
      title: this.state.newskill
    };
    axios.post(url, newSkills )
      .then(res => {
      })

      this.setState({
        newskill: ''
      })
  }

  handleDelete (id){
    axios.delete('https://dev.specialisedjobs.com:5009/adminpanel/APTemplates/skills?skillid='+{id})
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <div className={classes.addSkillContainer}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Add New Skill</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Skill"
                        id="newSkill"
                        value={this.state.newskill}
                        onChange={(e) => this.textChangeHandler(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <div className={classes.skillAddButton}>
                        <Button
                          color="primary"
                          onClick={() => this.handlePost()}>Add Skills</Button>
                      </div>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>

        <div className={classes.viewSkillContainer}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.state.skills.map((skills, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {skills.title}
                      
                        
                      </TableCell>
                      <TableCell align="left"><CancelIcon  onClick={(id) => this.handleDelete(skills._id)} /></TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(NewSkill);

