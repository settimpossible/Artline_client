import React, { Component, useState } from "react";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import { Link } from "react-router-dom";
import ChatTwoToneIcon from "@material-ui/icons/ChatTwoTone";
import RateReviewTwoToneIcon from "@material-ui/icons/RateReviewTwoTone";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import StarsTwoToneIcon from "@material-ui/icons/StarsTwoTone";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

const initialState = {
  comment: "",
  mark: 0,
};
export class ReviewActivity extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props = props;
    this.state = initialState;
  }

  sendComment() {
    console.log("hehe getting coms");

    return apiHandler
      .addComment(
        this.props.context.user._id,
        this.props.activity._id,
        this.state.comment
      )
      .then((apiRes) => {
        this.setState({ success: true });
        return Promise.resolve(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getMark() {
    console.log("hehe getting mark");

    return apiHandler
      .addMark(
        this.props.context.user._id,
        this.props.activity._id,
        this.state.mark
      )
      .then((apiRes) => {
        this.setState({ success: true });
        return Promise.resolve(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit() {
    console.log("hehe vchui là");
    let { mark, comment } = this.state;
    console.log({ mark, comment });
    this.getMark()
      .then(() => this.sendComment())
      .then(() => {
        this.setState(initialState);
        this.props.reload();
      });
  }

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({
      [key]: value,
    });
  };

  render() {
    return (
      // <div>
      //   <label htmlFor="mark"></label>
      //   <input
      //     value={this.state.mark}
      //     type="number"
      //     name="mark"
      //     onChange={this.handleChange}
      //   />
      //   <label htmlFor="comment"></label>

      //   <textarea
      //     value={this.state.comment}
      //     name="comment"
      //     onChange={this.handleChange}
      //   />
      //   <button onClick={this.handleSubmit}>Envoyer votre revue !</button>
      // </div>

      <Box component="fieldset" mb={3} borderColor="transparent">
        {/* <Typography component="legend"</Typography> */}
        <h1 className="center" style={{ paddingTop: "70px" }}>
          Partagez votre avis :
        </h1>
        <div className="center">
          <StyledRating
            max={10}
            name="customized-color"
            name="mark"
            onChange={(e) => this.handleChange(e)}
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
          />
        </div>
        {!!this.state.mark && (
          <>
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                marginLeft: "20rem",
                marginRight: "20rem",

                flexDirection: "column",
              }}
              lassName="center"
            >
              Votre note : {this.state.mark}
            </h2>
          </>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            marginLeft: "20rem",
            marginRight: "20rem",

            flexDirection: "column",
          }}
        >
          <p className={{ padding: "20px 0" }}>
            Laissez un commentaire sur l'activité :
          </p>
          <div
            style={{
              fontFamily: "Barlow",
            }}
          >
            <TextareaAutosize
              name="comment"
              style={{
                fontFamily: "Barlow",
                width: "100%",
              }}
              aria-label="empty textarea"
              placeholder="Votre mot doux..."
              rows={4}
              value={this.state.comment}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <button
            style={{
              backgroundColor: "black",
              fontFamily: "Barlow",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              color: "white",
            }}
            onClick={this.handleSubmit}
          >
            PARTAGEZ
          </button>
        </div>
      </Box>
    );
  }
}

export default withUser(ReviewActivity);
