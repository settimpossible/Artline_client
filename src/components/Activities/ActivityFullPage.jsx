import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import ReviewActivity from "../Activities/ReviewActivity";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

export class Activity extends Component {
  state = {
    activity: {
      title: "",
      _id: "",
      comments: [],
      marks: [],
    },
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    let activityId = this.props.match.params.id;
    apiHandler
      .getActivity(activityId)
      .then((activity) => {
        this.setState({
          activity,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  invert(arr) {
    let newArr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      newArr.push(arr[i]);
    }
    console.log(newArr);
    return newArr;
  }

  render() {
    const marks = this.state.activity.marks.map((mark) => mark.mark);
    console.log(marks);
    const comments = this.state.activity.comments;
    const mean = (
      marks.reduce((acc, curr) => Number(acc) + Number(curr), 0) / marks.length
    ).toFixed(2);

    return (
      <div style={{ display: "flex", width: "100vw", flexWrap: "wrap" }}>
        <div
          style={{
            maxWidth: "800px",
            textAlign: "center",
            margin: "2%",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          {" "}
          <h1>{this.state.activity.title}</h1>
          {!!marks.length && (
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">
                <h2>{mean}</h2>
              </Typography>
              <StyledRating
                name="customized-color"
                value={mean}
                readOnly
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
              />
            </Box>
          )}
          <img
            style={{ height: "300px" }}
            src={this.state.activity.img}
            alt={this.state.activity.description}
          />
          <div>{this.state.activity.description}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {this.state.activity.title !== "" && (
            <ReviewActivity
              activity={this.state.activity}
              reload={() => this.getData()}
            />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "space-evenly",
              width: "100%",
              margin: "0 auto",

              flexWrap: "wrap",
              height: "400px",
              overflowY: "auto",
              border: "solid 1px black",
              borderRadius: "12px",
            }}
          >
            {this.invert(comments).map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function Comment(props) {
  // apiHandler

  let { user, comment } = props.comment;
  console.log(user);
  return (
    <div
      style={{
        display: "flex",
        minWidth: "200px",
        height: "200px",
        borderRadius: "12px",
        background: "white",
        margin: "2%",
        justifyContent: "space-evenly",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            border: "solid 1px black",
            borderRadius: "15px",
            height: "80px",
            width: "40px",
          }}
        />
        <div>{user.name || user.email.split("@")[0]}</div>
      </div>
      <div style={{ display: "grid", placeItems: "center" }}>
        &laquo; {comment} &raquo;{" "}
      </div>
    </div>
  );
}

export default withRouter(Activity);
