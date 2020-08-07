import { Link } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import React, { Component, useState } from "react";
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

import ReviewActivity from "./ReviewActivity";

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

function AddToFav({ isFav, remove, add, loggedIn, activity }) {
  const [open, setOpen] = useState(false);
  const [mark, setMark] = useState(null);

  return (
    <div
      style={{
        position: "absolute",
        top: "5px",
        right: "5px",
        width: "50px",
        textAlign: "center",
        padding: "2px",
        background: "rgba(255,255,255,0.7)",
      }}
    >
      {loggedIn && (
        <span
          style={{ display: "flex" }}
          onClick={() => (isFav ? remove() : add())}
        >
          <RateReviewTwoToneIcon onClick={() => setOpen(true)} />
          {isFav ? <FavoriteRoundedIcon /> : <FavoriteTwoToneIcon />}
        </span>
      )}
      <Modal
        style={{
          left: "20vw",
          width: "60vw",
          top: "20vh",
          height: "60vh",
          border: "none",
        }}
        onClose={() => setOpen(false)}
        open={open}
      >
        <div
          className="center demescouilles"
          style={{
            background: "white",
            height: "100%",
            width: "100%",
            textAlign: "center",
          }}
        >
          <ReviewActivity activity={activity} />
        </div>
      </Modal>
    </div>
  );
}

export class ActivityCard extends Component {
  state = {
    showDescription: false,
  };

  addFav() {
    console.log("ADD");
    apiHandler
      .addActivityToFav(this.props.context.user._id, this.props.activity._id)
      .then(this.props.context.reloadData);
  }

  toggleDescription() {
    this.setState({ showDescription: !this.state.showDescription });
  }

  removeFav() {
    console.log("REMOVE");
    apiHandler
      .removeActivityFromFav(
        this.props.context.user._id,
        this.props.activity._id
      )
      .then(this.props.context.reloadData);
  }

  getFilterImg(arg) {
    const catFilter = [
      "Vidéo, flux en direct, programmes en différé",
      "Audio, radio, podcasts",
      "Concerts, spectacles",
      "Expositions virtuelles",
      "Jeux",
      "Enfants",
    ];

    const imgFilter = [
      "../../images/2.png",
      "../../images/5.png",
      "../../images/6.png",
      "../../images/7.png",
      "../../images/4.png",
      "../../images/8.png",
      "../../images/15.png",
    ];
    let i;
    let imgF = "../../images/15.png";
    for (i = 0; i < catFilter.length; i++) {
      if (arg === catFilter[i]) return (imgF = imgFilter[i]);
      else {
        return imgF;
      }
    }
  }
  render() {
    const activity = this.props.activity;
    const marks = activity.marks.map((e) => e.mark);
    const avgMarks =
      marks.length > 0
        ? marks.reduce((a, b) => Number(a) + Number(b), 0) / marks.length
        : "Pas de notes";

    console.log(activity.marks);
    const nbcoms = activity.comments.length;
    const isFav = this.props.context?.user?.favorites
      ? this.props.context?.user?.favorites
          .map((fav) => fav._id)
          .includes(activity._id)
      : false;
    const dataFav = {
      isFav,
      activity,
      remove: () => this.removeFav(),
      add: () => this.addFav(),
      loggedIn: this.props.context.isLoggedIn,
      editMode: this.props.editMode,
    };
    return (
      <>
        <div className="card">
          <AddToFav {...dataFav} />

          <Link to={`/activity/${activity._id}`}>
            <div className="card-image">
              <img className="card-image" src={activity.img} alt="test" />
              <h2 className="title">{activity.title || "notitle"}</h2>
            </div>
          </Link>

          <div className="card-text">
            {!!activity?.description?.trim() && (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => this.toggleDescription()}
              >
                <h3>Description</h3>
                {this.state.showDescription && (
                  <div>{activity.description}</div>
                )}
              </div>
            )}

            {/* <span>{activity.description}</span> */}
          </div>

          <div className="card-stats">
            {/* <div className="stats">
              <div className="value">62</div>
              <div className="type">
                <FavoriteTwoToneIcon />
              </div>
            </div> */}
            <div className="stats">
              <div className="value">{avgMarks}</div>
              <div className="type">
                {" "}
                <StarsTwoToneIcon />
              </div>
            </div>
            <div className="stats">
              <div className="value">{nbcoms}</div>
              <div className="type">
                <ChatTwoToneIcon />
              </div>
            </div>
          </div>
        </div>
        <div>
          {this.props.editMode && (
            <span onClick={() => this.props.onEdit(activity)}>ÉDITE-MOI</span>
          )}
        </div>
        <div>
          {this.props.editMode && (
            <span onClick={() => this.props.onDelete(activity._id)}>
              DELETE
            </span>
          )}
        </div>
      </>
    );
  }
}

export default withUser(ActivityCard);

//   {/* <div className="round-image">
//   <img className="user-img" src={activity.img} alt="activity" />
// </div> */}
// <img className="card-image" src="/images/test.png" alt="test" />
// <h2 className="title">{activity.title || "notitle"}</h2>
// {/* <div>
//   {" "}
//   <img
//     className="card-image"
//     src={this.props.getFilterImg(activity.category)}
//     alt="test"
//   />
// </div> */}
// {/* <p>{getFilterImg(activity.category)}</p> */}
// <p>Durée : {activity.duration} </p>
// {/* <p>{activity.access} </p>
// <p>{activity.theme} </p>

// <p>{activity.owner_name} </p> */}
