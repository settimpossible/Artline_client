import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import ReviewActivity from "../Activities/ReviewActivity";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withUser } from "../Auth/withUser";
import Link from "@material-ui/core/Link";

import { AllTags } from "./ActivityCard";

const niceButton = {
  textTransform: "uppercase",
  background: "black",
  fontFamily: "arial",
  color: "white",
  fontSize: "0.7rem",
  borderRadius: "12px",
  margin: "5px",
  padding: "8x",
};
const commentsStyle = {
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
};

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
      <div>
        <h1
          style={{
            textAlign: "center",
            marginTop: "3%",
          }}
        >
          {this.state.activity.title}
        </h1>{" "}
        <h1
          style={{
            textAlign: "center",
          }}
        >
          {" "}
          <AllTags activity={this.state.activity} />
        </h1>
        <h1 className="center">
          {!!marks.length && <MeanComponent mean={mean} />}
        </h1>
        <div
          style={{
            textAlign: "justify",
            marginTop: "2%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <img
            style={{ height: "350px" }}
            src={this?.state?.activity?.img}
            alt={this?.state?.activity?.description}
          />
          <div className="padding" style={{ padding: "30px" }}>
            <p>
              <div>Durée de l'activité : {this?.state?.activity?.duration}</div>{" "}
            </p>
            <div>
              <p>Tags : </p>
              {this?.state?.activity?.theme?.map((e) => (
                <button style={niceButton} key={e}>
                  {e}
                </button>
              ))}{" "}
            </div>
            <div style={{ width: "500px" }}>
              <p style={{ fontWeight: "900" }}>Description:</p>
              <p> {this?.state?.activity?.description}</p>
            </div>
            <Link href={this?.state?.activity?.url}>
              Consulter la ressource
            </Link>{" "}
          </div>
        </div>
        <div style={{}}>
          {this.state.activity.title !== "" &&
            this.props.context.isLoggedIn && (
              <ReviewActivity
                activity={this.state.activity}
                reload={() => this.getData()}
              />
            )}
        </div>
        <div style={commentsStyle}>
          {this.invert(comments).map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    );
  }
}

var imgArray = [
  "/images/comment/1.png",
  "/images/comment/2.png",
  "/images/comment/3.png",
  "/images/comment/4.png",
  "/images/comment/5.png",
  "/images/comment/6.png",
  "/images/comment/7.png",
  "/images/comment/8.png",
];

function Comment(props) {
  let { user, comment } = props.comment;
  console.log(user);
  const src = imgArray[Math.floor(Math.random() * imgArray.length)];
  return (
    <div
      style={{
        display: "flex",
        minWidth: "200px",
        height: "100px",
        borderRadius: "12px",
        background: "white",
        margin: "2%",
        flexDirection: "column",
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
        <div style={{}} />
        <div>
          <img
            style={{
              paddingTop: "5px",
              height: "60px",
            }}
            src={src}
            alt="comments"
          />
        </div>
        <div>{user.email.split("@")[0]} 💬 dit :</div>
      </div>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          fontFamily: "Barlow-Light",
        }}
      >
        {comment}
      </div>
    </div>
  );
}

export default withUser(withRouter(Activity));
function MeanComponent({ mean }) {
  return (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <Typography component="legend">
        <h2>{mean}</h2>
      </Typography>
      <StyledRating
        name="customized-color"
        value={Math.floor(mean)}
        readOnly
        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        max={10}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
      />
    </Box>
  );
}
