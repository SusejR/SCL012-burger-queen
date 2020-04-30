import React, { Component } from "react";
import "../../App.css";
import "./clientID.css";
import backButton from "../../imagenes/backButton.png";
import Welcome from "../../templates/welcome";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class clientID extends Component {
  //Función que toma el valor del input del cliente
  handleChanges = e => {
    const client = e.target.value;
    this.props.inputClient(client);
  };
  //Función que toma el valor del input de la mesa
  handleChange = e => {
    const table = e.target.value;
    this.props.selectTable(table);
  };

  backButton = () => { 
    console.log('clicked back button')   
    return(
    <Router>
      <Route exact path="/">
          <Welcome />
      </Route>
    </Router>
    );
   
  };

  render() {
    return (
      <div className="clientID">
        <div className="client">
          <div className="button-back">
          <Link to="/">
            <img
              onClick={() => this.backButton()}
              alt="backButton"
              src={backButton}
            />
            </Link>
        

            <label className="titleClient">Nombre del Cliente:</label>

            <input
              onChange={e => this.handleChanges(e)}
              className="inputClient"
              type="text"
              name="client"
              value={this.props.client}
            />

            <p className="titleClient">Mesa:</p>

            <select onChange={e => this.handleChange(e)} className="mesa">
              <option value="" disabled selected hidden>#</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default clientID;
