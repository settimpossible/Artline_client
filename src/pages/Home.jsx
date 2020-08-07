import React from "react";
import ActivityDisplay from "../components/Activities/ActivityDisplay";
import apiHandler from "../api/apiHandler";

class Home extends React.Component {
  state = {
    activities: [],
  };

  componentDidMount() {
    apiHandler.getActivities().then((data) => {
      this.setState({ activities: data });
    });
  }

  render() {
    return (
      <div>
        <div className="website-title">
          <div className="video-container">
            <video loop={true} autoplay="autoplay" id="vid" muted>
              <source src="../../videos/landing.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="caption-website-title">
            <h1>ART'LINE</h1>
            <h2>Culture from home.</h2>
          </div>
        </div>
        {this.state.activities.length > 0 && (
          <ActivityDisplay activities={this.state.activities} />
        )}
      </div>
    );
  }
}
export default Home;
