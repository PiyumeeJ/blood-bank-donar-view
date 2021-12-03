import React, { Component } from 'react';
import {Avatar, Grid, Paper, TextField, Button, FormLabel} from '@material-ui/core';

import { Typography } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { FormControl } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import './Register.css';
import { Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import axios from "axios";
import Collapse from '@material-ui/core/Collapse';
import cities from '../Cities';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state ={loading: false, error: false, firstName: '',lastName: '',idNumber: '',donorId: '', bloodType: '', mobileNumber:'', streetAddress:'',city:'', gender: '', email: '', password: '', role: 'user'};
        this.handleSumbit = this.handleSumbit.bind(this);
    }

    handleSumbit(event) {
        this.setState({loading: true});
        const endpoint = "http://localhost:8080/register";

        const options = {
          headers: {'Content-Type': 'application/json'}
        };

        const jsonBody = '{"firstName":"'+ this.state.firstName + '","lastName":"'+ this.state.lastName 
        + '","idNumber":"'+ this.state.idNumber+ '","donorId":"'+ this.state.donorId+ '","bloodType":"'+ this.state.bloodType + '","mobileNumber":"' 
        + this.state.mobileNumber + '","streetAddress":"' + this.state.streetAddress + '","city":"' + this.state.city + '","gender":"' + this.state.gender 
        + '","email":"'+ this.state.email + '","password":"' + this.state.password + '","role":"user"}';

        event.preventDefault();
        console.log(this.state);
        const res = axios.post(endpoint, jsonBody, options).then(res => {
            if(res.status == 200){
              localStorage.setItem('token', res.data.token)
                console.log("sucesfull");
            } else {
                console.log("not working");
            }
            this.setState({error: false});
            this.setState({loading: false});
        }, error => {
          if (error.response.status === 401) {
           //place your reentry code
           console.log("Got athentication error");
          } else if(error.response.status === 409) {
           console.log("Conflict Error");   
           this.setState({error: true});
           this.setState({loading: false});
          }
        });
    }
    

    render() {
        const avatarStyle = {backgroundColor: '#ff0000'};
        const radioButtonGap = {marginTop: 15};
        const buttonStyle = {marginTop: 10};
        const selectorStyle = {minWidth: 220};
        
        return (
            <>
                <Grid>
                    <Paper elevation = {20} className="paperContainer">
                        <Grid align='center'>
                            <Avatar style={avatarStyle}>
                                <AddCircleOutlineOutlinedIcon/>
                            </Avatar>
                        <h2>Sign Up</h2>
                        <Typography variant='caption' gutterBottom>Please fill the form to create a Blood Donor Account.</Typography>
                        <Collapse in={this.state.error}>
                            <p className={this.state.error ? "uthErrorText" : ''}>A user already exist with this ID Number. cant register.!</p>
                        </Collapse>
                        </Grid>
                        <form>
                            <TextField fullWidth label='First Name' onChange={(event) => this.setState({firstName: event.target.value})}/>
                            <TextField fullWidth label='Last Name' onChange={(event) => this.setState({lastName: event.target.value})}/>
                            <TextField fullWidth label='ID Number' onChange={(event) => this.setState({idNumber: event.target.value})}/>
                            <TextField fullWidth label='Donor Registration Id' onChange={(event) => this.setState({donorId: event.target.value})}/>
                            <FormControl style={selectorStyle}>
                                <InputLabel htmlFor="age-native-simple">Blood Types</InputLabel>
                                <Select 
                                native
                                onChange = {(event) => this.setState({bloodType: event.target.value})}
                                >
                                <option aria-label="None" value="" />
                                <option value={'A'}>A</option>
                                <option value={'A+'}>A+</option>
                                <option value={'B'}>B</option>
                                <option value={'B+'}>B+</option>
                                <option value={'AB'}>AB</option>
                                <option value={'O+'}>O+</option>
                                <option value={'O-'}>O-</option>
                                </Select>
                            </FormControl>
                            <TextField type={"number"} fullWidth label='Mobile Number' onChange={(event) => this.setState({mobileNumber: event.target.value})}/>
                            <TextField fullWidth label='Street Address' onChange={(event) => this.setState({streetAddress: event.target.value})}/>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">City</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.city}
                                    label="City"
                                    onChange={(event) => this.setState({city: event.target.value})}
                                >
                                    {cities.map((row) => (
                                    <MenuItem value={row.name}>{row.name}</MenuItem>
                                    ))}
                                    {/* <MenuItem value={"Twenty"}>Twenty</MenuItem>
                                    <MenuItem value={"Thirty"}>Thirty</MenuItem> */}
                                </Select>
                            </FormControl>
                            <FormControl component="fieldset" style={radioButtonGap} >
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" onChange={(event) => this.setState({gender: event.target.value})}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                            <TextField fullWidth label='Email' onChange={(event) => this.setState({email: event.target.value})}/>
                            <TextField fullWidth label='Password' onChange={(event) => this.setState({password: event.target.value})}/>
                            <TextField fullWidth label='Confirm Password'/>
                            <Button fullWidth style={buttonStyle} type='submit' variant='contained' color='primary' onClick={this.handleSumbit} disabled={this.state.loading}>
                                { this.state.loading && (<i className="fa fa-refresh fa-spin"></i>)}
                                <span>&nbsp;Sign Up</span>
                                </Button>
                        </form>
                    </Paper>
                </Grid>
            </>
        )
    }
}
