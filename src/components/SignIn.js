import React, {useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Collapse from '@material-ui/core/Collapse';
import axios from "axios";
import { red } from '@material-ui/core/colors';
import {useHistory} from 'react-router-dom';
import { AuthenticationContext } from '../contexts/AuthenticationContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  uthErrorText: {
    color: theme.palette.secondary.main
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const {isAuthenticated, toggleAuth} = useContext(AuthenticationContext)


    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpoint = "http://localhost:8083/authenticate";

        const options = {
          headers: {'Content-Type': 'application/json'}
        };

        const json = JSON.stringify({ "username": username, "password": password, role: "user" });
        const res = await axios.post(endpoint, json, options).then(res => {
            if(res.status == 200){
              localStorage.setItem('token', res.data.token)
                console.log("sucesfull");
                setError(false);
                toggleAuth();
                return  history.push('/');
            } else {
                console.log("not working");
            }
        }, error => {
          if (error.response.status === 401) {
           //place your reentry code
           setError(true);
           console.log("Got athentication error");
          }
        });
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error= {error ? true : false}
            onChange={(event) => {setUsername(event.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error= {error ? true : false}
            onChange={(event) => {setPassword(event.target.value)}}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Collapse in={error}>
            <p className={error ? classes.uthErrorText: ''}>Username or Password is incorrect.!</p>
          </Collapse>
          
        </form>
      </div>
    </Container>
  );
}