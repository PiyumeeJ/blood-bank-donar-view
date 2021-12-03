import React, {useEffect} from 'react';
import {TextField, Button, FormLabel, Input} from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import './Profile.css';
import axios from "axios";
import { useForm } from "react-hook-form";
import CampDetails from './CampDetails';
import cities from './Cities';
import useState from 'react-usestateref';

function Profile() {
    const avatarStyle = {backgroundColor: '#ff0000'};
    const radioButtonGap = {marginTop: 15};
    const buttonStyle = {marginTop: 10};
    const selectorStyle = {minWidth: 220};

    const [profileDetails, setProfileDetails] = useState('');
    const[firstPassword,setPassword]= useState('');

    const[validPassword, setvalidpassword,setvalidpasswordref]= useState(false);




    const val = "sa";

    // useEffect(async ()=> {

    //     let axiosConfig = {
    //         headers: {
    //           'x-auth-token': localStorage.getItem('token')
    //         }
    //       };
    //       console.log("first")
    //       console.log(profileDetails)
    //       axios
    //       .get("http://localhost:8080/user", axiosConfig)
    //       .then((response) => {
    //         console.log(response.data);
    //         setProfileDetails(response.data);
    //       });
    //       console.log("ended")
    //       console.log(profileDetails)
    //     }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit was called");
        const endpoint = "http://localhost:8080/user/update";

        const options = {
          headers: {'Content-Type': 'application/json', 'x-auth-token': localStorage.getItem('token')}
        };

        if(users.password !== firstPassword) {
            setvalidpassword(true);
          } else {
            setvalidpassword(false);
          }

      if(setvalidpasswordref.current){
        const jsonBody = users;
        const res = axios.post(endpoint, jsonBody, options).then(res => {
            if(res.status == 200){
                console.log("sucesfull");
            } else {
                console.log("not working");
            }
        }, error => {
          if (error.response.status === 401) {
           //place your reentry code
           console.log("Got athentication error");
          } else if(error.response.status === 409) {
           console.log("Conflict Error");   
          }
        });
    }
    }


    const [users, setUsers] = useState({
        "firstName": "",
        "lastName": "",
        "idNumber": "",
        "donorId": "",
        "streetAddress": "",
        "city": "",
        "mobileNumber": "",
        "bloodType": "",
        "email": "",
        "gender": "",
        "password": ""
    });

    const [gamer, setGamer] = useState({});
    const [auth, setAuth] = useState('');

    let email = "sample";

  useEffect(() => {
    let axiosConfig = {
                headers: {
                  'x-auth-token': localStorage.getItem('token')
                }
              };
    
    if (Object.keys(gamer).length === 0) {
        console.log("empty");
        axios.get("http://localhost:8080/user", axiosConfig).then((res) => {
        setUsers((prevState) => ({...prevState, "firstName": res.data.firstName}));
        setUsers((prevState) => ({...prevState, "lastName": res.data.lastName}));
        setUsers((prevState) => ({...prevState, "idNumber": res.data.idNumber}));
        setUsers((prevState) => ({...prevState, "donorId": res.data.donorId}));
        setUsers((prevState) => ({...prevState, "streetAddress": res.data.streetAddress}));
        setUsers((prevState) => ({...prevState, "city": res.data.city}));
        setUsers((prevState) => ({...prevState, "mobileNumber": res.data.mobileNumber}));
        setUsers((prevState) => ({...prevState, "bloodType": res.data.bloodType}));
        setUsers((prevState) => ({...prevState, "email": res.data.email}));
        setUsers((prevState) => ({...prevState, "gender": res.data.gender}));
        // setUsers(res.data);
        setGamer("set Data");
    //   reset(res.data);
    });
    }else {
        console.log("not empty");
        setGamer("sample");
        // email = users.id;
    }

    }, [users]);

    return (
            <div className="profileContainer">
            <form>
                <TextField fullWidth label='First Name' value = {users.firstName} onChange= {(e) => setUsers((prevState) => ({...prevState, "firstName": e.target.value}))}/>
                <TextField fullWidth label='Last Name' value = {users.lastName} onChange= {(e) => setUsers((prevState) => ({...prevState, "lastName": e.target.value}))}/>
                <TextField fullWidth label='ID Number'  disabled value = {users.idNumber}/>
                <TextField fullWidth label='Donot ID'  disabled value = {users.donorId}/>
                <TextField fullWidth label='Blood Type'  disabled value = {users.bloodType}/>
                <TextField type={"number"} fullWidth label='Mobile Number' value = {users.mobileNumber} onChange= {(e) => setUsers((prevState) => ({...prevState, "mobileNumber": e.target.value}))}/>
                <TextField fullWidth label='Street Address' value = {users.streetAddress} onChange= {(e) => setUsers((prevState) => ({...prevState, "streetAddress": e.target.value}))}/>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={users.city}
                        defaultValue={users.city}
                        label="City"
                        onChange={(e) => setUsers((prevState) => ({...prevState, "city": e.target.value}))}
                    >
                        {cities.map((row) => (
                        <MenuItem value={row.name}>{row.name}</MenuItem>
                        ))}
                        {/* <MenuItem value={"Twenty"}>Twenty</MenuItem>
                        <MenuItem value={"Thirty"}>Thirty</MenuItem> */}
                    </Select>
                </FormControl>
                <FormControl component="fieldset" style={radioButtonGap} disabled>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={users.gender}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                    </FormControl>
                <TextField fullWidth label='Email' value = {users.email} onChange= {(e) => setUsers((prevState) => ({...prevState, "email": e.target.value}))}/>
                <TextField fullWidth label='Password' type='password' id='password'  onChange = {(e) => setPassword(e.target.value)} />
                {setvalidpasswordref.current ? <p>Passwords are not matched</p>:""}
                <TextField fullWidth label='Confirm Password' type='Password' onChange= {(e) => setUsers((prevState) => ({...prevState, "password": e.target.value}))}/>
                <Button style={buttonStyle} type='submit' variant='contained' color='primary' onClick= {handleSubmit}>Save</Button>
            </form>
            </div>
    )
}

export default Profile
