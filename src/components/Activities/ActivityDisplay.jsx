import ActivityCard from "./ActivityCard";
import React, { Component } from "react";
import SearchBar from "material-ui-search-bar";
import Button from "@material-ui/core/Button";
import ChildCareTwoToneIcon from "@material-ui/icons/ChildCareTwoTone";
import HearingTwoToneIcon from "@material-ui/icons/HearingTwoTone";
import SportsEsportsTwoToneIcon from "@material-ui/icons/SportsEsportsTwoTone";
import MovieFilterTwoToneIcon from "@material-ui/icons/MovieFilterTwoTone";
import MusicNoteTwoToneIcon from "@material-ui/icons/MusicNoteTwoTone";
import PaletteTwoToneIcon from "@material-ui/icons/PaletteTwoTone";
import LocalPlayTwoToneIcon from "@material-ui/icons/LocalPlayTwoTone";
const video = "Vidéo, flux en direct, programmes en différé";
const audio = "Audio, radio, podcasts";
const expo = "Expositions virtuelles";
const show = "Concerts, spectacles";
const game = "Jeux";
const kid = "Enfants";

export class ActivityDisplay extends Component {
  state = {
    searchValue: "",
    onlyVideo: false,
    onlyAudio: false,
    onlyExpo: false,
    onlyShow: false,
    onlyGame: false,
    onlyKid: false,
    onlyAccess: false,
    activities: [],
  };

  componentDidMount() {
    this.getFilteredValues("");
  }

  getFilteredValues(searchValue) {
    let activities;
    if (this.props.activities.length === 0) return;
    activities = [...this.props.activities].filter((activity) => {
      const cond1 = activity?.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const cond2 = activity?.description
        ?.toLowerCase()
        .includes(searchValue.toLowerCase());
      const cond3 = activity?.category?.includes(searchValue.toLowerCase());
      const cond4 = activity?.theme.includes(searchValue.toLowerCase());
      const cond5 = activity?.owner_name
        ?.toLowerCase()
        .includes(searchValue.toLowerCase());

      let keepActivity = true;
      if (
        this.state.onlyVideo ||
        this.state.onlyAudio ||
        this.state.onlyExpo ||
        this.state.onlyShow ||
        this.state.onlyGame ||
        this.state.onlyKid ||
        this.state.onlyAccess
      ) {
        // one filter is selected
        let cond6 = false;
        if (this.state.onlyVideo) {
          if (activity?.type?.includes(video)) cond6 = true;
        }
        let cond7 = false;
        if (this.state.onlyAudio) {
          if (activity?.type?.includes(audio)) cond7 = true;
        }
        let cond8 = false;
        if (this.state.onlyExpo) {
          if (activity?.type?.includes(expo)) cond8 = true;
        }
        let cond9 = false;
        if (this.state.onlyShow) {
          if (activity?.category?.includes(show)) cond9 = true;
        }
        let cond10 = false;
        if (this.state.onlyGame) {
          if (activity?.category?.includes(game)) cond10 = true;
        }
        let cond11 = false;
        if (this.state.onlyKid) {
          if (activity?.public?.includes(kid)) cond11 = true;
        }
        let cond12 = false;
        if (this.state.onlyAccess) {
          if (activity.access.length === 0) cond12 = true;
        }
        keepActivity =
          cond6 || cond7 || cond8 || cond9 || cond10 || cond11 || cond12;
      }

      return (cond1 || cond2 || cond3 || cond4 || cond5) && keepActivity;
    });
    this.setState({
      activities,
      searchValue,
    });
  }

  handleSearch(search) {
    this.getFilteredValues(search);
  }

  videoFilter() {
    this.setState({ onlyVideo: !this.state.onlyVideo }, () => {
      this.getFilteredValues(this.state.searchValue);
    });
  }

  audioFilter() {
    this.setState({ onlyAudio: !this.state.onlyAudio }, () => {
      this.getFilteredValues(this.state.searchValue);
    });
  }

  expoFilter() {
    this.setState({ onlyExpo: !this.state.onlyExpo }, () => {
      this.getFilteredValues(this.state.searchValue);
    });
  }

  showFilter() {
    this.setState({ onlyShow: !this.state.onlyShow }, () => {
      this.getFilteredValues(this.state.searchValue);
    });
  }

  gameFilter() {
    this.setState({ onlyGame: !this.state.onlyGame }, () => {
      this.getFilteredValues(this.state.searchValue);
    });
  }

  kidFilter() {
    this.setState({ onlyKid: !this.state.onlyKid }, () => {
      this.getFilteredValues(this.state.searchValue);
    });
  }

  accessFilter() {
    this.setState({ onlyAccess: !this.state.onlyAccess }, () => {
      this.getFilteredValues(this.state.searchValue);
    });
  }

  sortbyMark(arr, n = 3) {
    let c = [...arr].filter((e) => Boolean(e?.marks.length));
    c.sort((a, b) => this.avg(a.marks) - this.avg(b.marks));
    return c.filter((_, i) => i < n);
  }

  avg(marks) {
    return Math.floor(marks.reduce((a, b) => a + b, 0) / marks.length);
  }

  render() {
    const n = 3;

    const sorted = !!this?.state?.activities?.length
      ? this.sortbyMark(this.state.activities, n)
      : [];

    return (
      <div>
        <h1 className="margin center">Bienvenue sur ART'LINE</h1>
        <h2 className="margin center">TOP {n}</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {sorted.map((activity) => (
            <ActivityCard activity={activity} />
          ))}
        </div>
        <div className="center">
          <SearchBar
            className="margin search-bar "
            placeholder="Rechercher une activité..."
            value={this.state.searchValue}
            onChange={(value) => this.handleSearch(value)}
          />
          {/* <input
            value={this.state.searchValue}
            onChange={(e) => this.handleSearch(e.target.value)}
          /> */}
        </div>
        <div className="center">
          <div>
            <Button
              style={
                this.state.onlyVideo
                  ? {
                      color: "black",
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      fontWeight: "900",
                      fontFamily: "Barlow",
                    }
                  : {}
              }
              onClick={() => this.videoFilter()}
            >
              <div className="filter-btn">
                {/* <img
                  className="filter-img"
                  src="../../images/2.png"
                  alt="filter-img video"
                />
                <i class="fas fa-theater-masks"></i> */}{" "}
                <MovieFilterTwoToneIcon />
                <span>Film & Vidéo</span>
              </div>
            </Button>
          </div>
          <div>
            <Button
              style={
                this.state.onlyAudio
                  ? {
                      color: "black",
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      fontWeight: "900",
                      fontFamily: "Barlow",
                    }
                  : {}
              }
              onClick={() => this.audioFilter()}
            >
              <div className="filter-btn">
                {/* <img
                  className="filter-img"
                  src="../../images/5.png"
                  alt="filter-img video"
                /> */}
                <MusicNoteTwoToneIcon />

                <span>Audio</span>
              </div>
            </Button>
          </div>
          <div>
            <Button
              style={
                this.state.onlyShow
                  ? {
                      color: "black",
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      fontWeight: "900",
                      fontFamily: "Barlow",
                    }
                  : {}
              }
              onClick={() => this.showFilter()}
            >
              <div className="filter-btn">
                {/* <img
                  className="filter-img"
                  src="../../images/6.png"
                  alt="filter-img video"
                /> */}
                <LocalPlayTwoToneIcon />
                <span>Spectacle</span>
              </div>
            </Button>
          </div>
          <div>
            <Button
              style={
                this.state.onlyExpo
                  ? {
                      color: "black",
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      fontWeight: "900",
                      fontFamily: "Barlow",
                    }
                  : {}
              }
              onClick={() => this.expoFilter()}
            >
              <div className="filter-btn">
                {/* <img
                  className="filter-img"
                  src="../../images/7.png"
                  alt="filter-img video"
                /> */}
                <PaletteTwoToneIcon />
                <span>Expo virtuelles</span>
              </div>
            </Button>
          </div>
          <div>
            <Button
              style={
                this.state.onlyGame
                  ? {
                      color: "black",
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      fontWeight: "900",
                      fontFamily: "Barlow",
                    }
                  : {}
              }
              onClick={() => this.gameFilter()}
            >
              <div className="filter-btn">
                {/* <img
                  className="filter-img"
                  src="../../images/4.png"
                  alt="filter-img video"
                /> */}
                <SportsEsportsTwoToneIcon />
                <span>Jeux</span>
              </div>
            </Button>
          </div>
          <div>
            <Button
              style={
                this.state.onlyKid
                  ? {
                      color: "black",
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      fontWeight: "900",
                      fontFamily: "Barlow",
                    }
                  : {}
              }
              onClick={() => this.kidFilter()}
            >
              <div className="filter-btn">
                {/* <img
                  className="filter-img"
                  src="../../images/8.png"
                  alt="filter-img video"
                /> */}
                <ChildCareTwoToneIcon /> <span>Enfants</span>
              </div>
            </Button>
          </div>
          <div>
            <Button
              style={
                this.state.onlyAccess
                  ? {
                      color: "black",
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      fontWeight: "900",
                      fontFamily: "Barlow",
                    }
                  : {}
              }
              onClick={() => this.accessFilter()}
            >
              {" "}
              <div className="filter-btn">
                {/* <img
                  className="filter-img"
                  src="../../images/15.png"
                  alt="filter-img video"
                /> */}
                <HearingTwoToneIcon />
                <span>Accessible SME</span>
              </div>
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {this.state.activities.map((activity) => (
            <ActivityCard key={activity._id} activity={activity} />
          ))}
        </div>
      </div>
    );
  }
}
export default ActivityDisplay;
