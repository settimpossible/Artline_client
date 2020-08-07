import React from "react";
import ActivityDisplay from "../components/Activities/ActivityDisplay";
import apiHandler from "../api/apiHandler";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activities: [] };
    this.loadActivities = this.loadActivities.bind(this);
  }

  loadActivities() {
    apiHandler.getActivities().then((data) => {
      this.setState({ activities: data });
    });
  }

  componentDidMount() {
    this.loadActivities();
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
          <ActivityDisplay
            reload={this.loadActivities}
            activities={this.state.activities}
          />
        )}
      </div>
    );
  }
}
export default Home;
