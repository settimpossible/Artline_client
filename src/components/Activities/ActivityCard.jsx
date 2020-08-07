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

import ChildCareTwoToneIcon from "@material-ui/icons/ChildCareTwoTone";
import HearingTwoToneIcon from "@material-ui/icons/HearingTwoTone";
import SportsEsportsTwoToneIcon from "@material-ui/icons/SportsEsportsTwoTone";
import MovieFilterTwoToneIcon from "@material-ui/icons/MovieFilterTwoTone";
import MusicNoteTwoToneIcon from "@material-ui/icons/MusicNoteTwoTone";
import PaletteTwoToneIcon from "@material-ui/icons/PaletteTwoTone";
import LocalPlayTwoToneIcon from "@material-ui/icons/LocalPlayTwoTone";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import StarsTwoToneIcon from "@material-ui/icons/StarsTwoTone";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import ReviewActivity from "./ReviewActivity";

const video = "Vidéo, flux en direct, programmes en différé";
const audio = "Audio, radio, podcasts";
const expo = "Expositions virtuelles";
const show = "Concerts, spectacles";
const game = "Jeux";
const kid = "Enfants";

const niceButton = {
  textTransform: "uppercase",
  background: "black",
  fontFamily: "arial",
  color: "white",
  fontSize: "0.7rem",
  borderRadius: "12px",
  marginBottom: "8px",
  padding: "8px",
};

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

function AddToFav({
  isFav,
  remove,
  add,
  loggedIn,
  activity,
  reload,
  reloadUser,
}) {
  const [open, setOpen] = useState(false);
  const [mark, setMark] = useState(null);

  function doReload() {
    setOpen(false);
    reload();
    // reload();
    // console.log(reload);
    // reload();
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        right: "0px",
        width: "297px",
        padding: "5px 0px",
        textAlign: "center",
        background: "white",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
      }}
    >
      {loggedIn && (
        <span
          style={{
            display: "flex",
            paddingRight: "5px",
            justifyContent: "flex-end",
          }}
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
          className="center"
          style={{
            background: "white",
            height: "100%",
            width: "100%",
            textAlign: "center",
          }}
        >
          <ReviewActivity activity={activity} reload={() => doReload()} />
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
      reload: () => this.props.reload(),
      reloadUser: this.props.context.reloadData,
    };

    return (
      <>
        <div className="card">
          <AddToFav {...dataFav} />

          <Link to={`/activity/${activity._id}`}>
            <div className="card-image">
              <img className="card-image" src={activity.img} alt="test" />
              <h2
                style={{
                  fontFamily: "Barlow-light",
                  fontSize: "1.5rem",
                  borderRadius: "12px",
                  textAlign: "center",
                  margin: "5px",
                  paddingTop: "10px",
                }}
              >
                {activity.title || "notitle"}
              </h2>
            </div>
          </Link>

          <div className="card-text">
            {!!activity?.description?.trim() && (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => this.toggleDescription()}
              >
                <AllTags activity={activity} />
                <div>
                  <h3
                    style={{
                      fontFamily: "Barlow-light",
                      fontWeight: "500",
                      fontSize: "0.8rem",
                      borderRadius: "12px",
                      textAlign: "center",
                      margin: "5px",
                      padding: "8x",
                    }}
                  >
                    Description{" "}
                  </h3>

                  {this.state.showDescription ? <ExpandLess /> : <ExpandMore />}
                  {this.state.showDescription && (
                    <div
                      style={{
                        fontFamily: "Barlow-light",
                        fontSize: "0.8rem",
                        borderRadius: "12px",
                        textAlign: "justify",
                        margin: "5px",
                        padding: "8x",
                      }}
                    >
                      {activity.description}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              {this.props.editMode && (
                <div
                  style={niceButton}
                  onClick={() => this.props.onEdit(activity._id)}
                >
                  ÉDITEZ
                </div>
              )}
            </div>
            <div>
              {this.props.editMode && (
                <div
                  style={niceButton}
                  onClick={() => this.props.onDelete(activity._id)}
                >
                  SUPPRIMEZ
                </div>
              )}
            </div>
            <div>
              {activity.theme.map((e) => (
                <button
                  style={{
                    textTransform: "uppercase",
                    background: "black",
                    fontFamily: "Barlow",
                    color: "white",
                    fontSize: "0.7rem",
                    borderRadius: "12px",
                    margin: "5px",
                    padding: "8x",
                  }}
                  key={e}
                >
                  {e}
                </button>
              ))}
            </div>
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
      </>
    );
  }
}

export default withUser(ActivityCard);

export function AllTags({ activity }) {
  let videoCond, audioCond, expoCond, showCond, gameCond, kidCond, accessCond;

  if (activity?.type?.includes(video)) videoCond = true;
  if (activity?.type?.includes(audio)) audioCond = true;
  if (activity?.type?.includes(expo)) expoCond = true;
  if (activity?.category?.includes(show)) showCond = true;
  if (activity?.category?.includes(game)) gameCond = true;
  if (activity?.public?.includes(kid)) kidCond = true;
  if (activity?.access?.length === 0) accessCond = true;

  return (
    <div>
      {videoCond && <MovieFilterTwoToneIcon />}
      {audioCond && <MusicNoteTwoToneIcon />}
      {expoCond && <PaletteTwoToneIcon />}
      {showCond && <LocalPlayTwoToneIcon />}
      {gameCond && <SportsEsportsTwoToneIcon />}
      {kidCond && <ChildCareTwoToneIcon />}
      {accessCond && <HearingTwoToneIcon />}
    </div>
  );
}

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
