import React, { Component } from "react";
import ActivityForm from "../components/Activities/ActivityForm";
import ActivityCard from "../components/Activities/ActivityCard";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler.js";

export class Profile extends Component {
  state = {
    formMode: null,
    data: {},
    creator: null,
  };

  createEvent() {
    this.setState({ ...this.state, formMode: "create" });
  }

  editEvent(newData) {
    this.setState({ ...this.state, formMode: "edit", data: newData });
  }

  deleteEvent(activityId) {
    apiHandler
      .removeActivity(activityId)
      .then((apiRes) => {
        this.setState({ success: true });
        //renvoyer sur le profile
        console.log(this.props.context);
        this.props.context.reloadData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getFav(activityId) {
    apiHandler
      .getUserActivity(activityId)
      .then((apiRes) => {
        this.setState({ success: true });
        //renvoyer sur le profile
        console.log(this.props.context);
        this.props.context.reloadData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  closeForm() {
    this.setState({ formMode: null, data: {} });
  }

  componentDidMount() {
    let userData = this.props.context.user;
    // let creator = this.props.context.user._id;
    // this.setState({ ...this.state, creator });
    console.log(userData);
    // va me chercher les activités de l'utilisateur stp
  }

  render() {
    return (
      <div>
        <h1>Le profil perso</h1>
        {this.state.formMode !== null && (
          <ActivityForm
            mode={this.state.formMode}
            creator={this.state.creator}
            editData={this.state.data}
            closeForm={() => this.closeForm()}
          />
        )}
        <button onClick={() => this.createEvent()}>
          Créer une nouvelle activité
        </button>
        <h2>ACTIVITÉS AJOUTÉES</h2>

        {this.props.context.user.activities.map((activity, i) => (
          <ActivityCard
            key={i}
            activity={activity}
            editMode
            onEdit={(data) => this.editEvent(data)}
            onDelete={(id) => this.deleteEvent(id)}
          />
        ))}
        <div>
          <h2>FAVORIS</h2>
          {this.props.context.user.favorites.map((fav, i) => (
            <ActivityCard key={i} activity={fav} />
          ))}
        </div>
      </div>
    );
  }
}

export default withUser(Profile);
