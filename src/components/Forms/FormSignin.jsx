import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";

//material ui
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import { ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: grey[900],
    },
  },
});
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const withMaterialStyles = (ComponentToPassStylesTo) => {
  return (props) => {
    const classes = useStyles();
    return <ComponentToPassStylesTo {...props} classes={classes} />;
  };
};

///

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  componentDidMount() {
    this.props.setBackground("transparent");
  }
  handleChange = (event) => {
    const key = event.target.name;

    // You can test more if you have to handle different sorts of inputs.

    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    const classes = this.props.classes;
    return (
      <ThemeProvider theme={theme}>
        <Container className="sign-in" component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <div className="center">
              <img
                className="sign-img"
                src="../../images/hey.png"
                alt="Logo ARTLINE"
              />
            </div>
            <Typography>
              <h2>Heureux de vous retrouver !</h2>
            </Typography>
            <form
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              className={classes.form}
              noValidate
            >
              <TextField
                InputLabelProps={{
                  style: {
                    fontFamily: "Barlow",
                  },
                }}
                variant="outlined"
                margin="normal"
                color="black"
                required
                fullWidth
                id="pseudo"
                label="Pseudo"
                name="pseudo"
                autoComplete="pseudo"
                autoFocus
              />
              <TextField
                InputLabelProps={{
                  style: {
                    fontFamily: "Barlow",
                  },
                }}
                variant="outlined"
                margin="normal"
                color="black"
                required
                fullWidth
                id="email"
                label="Adresse Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                InputLabelProps={{
                  style: {
                    fontFamily: "Barlow",
                  },
                }}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Se connecter
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Pas encore inscrit ? Rejoignez-nous !
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}></Box>
        </Container>
      </ThemeProvider>
    );
  }
  // <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
  //   <label htmlFor="email">Email</label>
  //   <input type="email" id="email" name="email" />
  //   <label htmlFor="password">Password</label>
  //   <input type="password" id="password" name="password" />
  //   <Button>Submit</Button>
  // </form>
}

export default withMaterialStyles(withRouter(FormSignin));
