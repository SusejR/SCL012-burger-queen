import React, { Component } from 'react';
import ReceivedOrders from '../sections/cook/ReceivedOrders'
import ReadyOrders from '../sections/cook/readyOrders'
import './cook.css'
import backButton from "../imagenes/backButton.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Welcome from "../templates/welcome";

class Cook extends Component {

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
			<div className="cookDiv">
				<Link to="/">
					<img
						onClick={() => this.backButton()}
						alt="Back Button"
						src={backButton}
						className="backButton"
					/>
				</Link>
				<ReceivedOrders />
				<ReadyOrders />
			</div>
		);
	}
}

export default Cook;