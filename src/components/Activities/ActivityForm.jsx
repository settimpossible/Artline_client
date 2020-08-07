import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { withUser } from "../Auth/withUser";

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

class ActivityForm extends Component {
  state = {
    title: "",
    description: "",
    category: "",
    access: "",
    url: "",
    public: "",
    duration: "",
    owner_name: "",
  };

  //firstInputRef = React.createRef(null);

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({
      [key]: value,
    });
  };

  componentDidMount() {
    //const mode = this.props.match.params.mode;
    //const activityId = this.props.match.params.id;

    //if (mode === "edit") {
    console.log(this.props.editData);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.mode === "create") this.add();
    if (this.props.mode === "edit") this.edit();
  };

  edit() {
    apiHandler
      .updateActivity(this.props.editData, {
        title: this.state.title,
        img: this.state.img,
        creator: this.props.creator,
        description: this.state.description,
        category: this.state.category,
        access: this.state.access,
        url: this.state.url,
        public: this.state.public,
        duration: this.state.duration,
        owner_name: this.state.owner_name,
      })
      .then((apiRes) => {
        this.setState({ success: true });
        this.props.context.reloadData();
        this.props.closeForm();
        //renvoyer sur le profile
      })
      .catch((error) => {
        console.log(error);
      });
  }

  add() {
    apiHandler
      .addActivity({
        title: this.state.title,
        img: this.state.img,
        creator: this.props.context.user._id,
        description: this.state.description,
        category: this.state.category,
        access: this.state.access,
        public: this.state.public,
        url: this.state.url,

        duration: this.state.duration,
        owner_name: this.state.owner_name,
      })
      .then((apiRes) => {
        this.setState({ success: true });
        this.props.context.reloadData();
        this.props.closeForm();

        //renvoyer sur le profile
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const mode = this.props.mode;

    // if (this.state.success) {
    //   return <Redirect to="/" />;
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{
          border: "solid 5px black",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <h2>
          {mode === "edit" ? "Éditez une" : "Ajouter une nouvelle"} activité
        </h2>
        <div>
          <div style={{ margin: "2% 0" }}>
            <label htmlFor="title">Nom de l'activité</label>
            <input
              type="text"
              name="title"
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ margin: "2% 0" }}>
            <label htmlFor="description">Description de l'activité</label>
            <input
              type="text"
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ margin: "2% 0" }}>
            <label className="label" htmlFor="category">
              Type d'activité
            </label>
            <select
              name="category"
              id="category"
              onChange={this.handleChange}
              defaultValue="-1"
            >
              <option value="-1" disabled>
                Selectionnez
              </option>
              <option value="audio" name="category">
                Musique, podcast, concert
              </option>
              <option value="art" name="category">
                Exposition en ligne
              </option>
              <option value="video" name="category">
                Film, documentaire, interview
              </option>
              <option value="spectacle" name="category">
                Spectacle, théâtre, opéra, ballet
              </option>
              <option value="livre" name="category">
                Livre numérique, archives
              </option>
              <option value="jeu" name="category">
                Jeux, enigmes
              </option>
            </select>
          </div>
          <div style={{ margin: "2% 0" }}>
            <label className="label" htmlFor="public">
              Contenu adapté aux :
            </label>
            <label htmlFor="public" name="public">
              Enfants
            </label>
            <input
              type="checkbox"
              id="public"
              value="kid"
              name="public"
              onChange={this.handleChange}
            ></input>
            <label htmlFor="access" name="access">
              Sourds et malentendants
            </label>
            <input
              type="checkbox"
              id="access"
              value="deaf"
              name="access"
              onChange={this.handleChange}
            ></input>
            <div></div>
            <label htmlFor="url">
              Renseignez l'URL de la ressource en ligne :
            </label>
            <input
              type="url"
              name="url"
              id="url"
              placeholder="https://artline.com"
              pattern="https://.*"
              value={this.state.url}
              required
              onChange={this.handleChange}
            ></input>
          </div>
          <div style={{ margin: "2% 0" }}>
            <label htmlFor="title">Activité conçue par :</label>
            <input
              type="text"
              name="owner_name"
              id="owner_name"
              value={this.state.owner_name}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ margin: "2% 0" }}>
            <label className="label" htmlFor="duration">
              Durée de l'activité{" "}
            </label>
            <select
              name="duration"
              id="duration"
              onChange={this.handleChange}
              defaultValue="-1"
            >
              <option value="-1" disabled>
                Selectionnez
              </option>
              <option value="half" name="duration">
                30 mins ou moins
              </option>
              <option value="one" name="duration">
                1h environ
              </option>
              <option value="two" name="duration">
                2h environ
              </option>
              <option value="morethantwo" name="duration">
                Plus de 2h
              </option>
            </select>
          </div>
        </div>

        <button style={niceButton}>Envoyez !</button>
      </form>
    );
  }
}

export default withUser(withRouter(ActivityForm));
