import { Component } from "react";
import { Link } from "react-router-dom";

export default class LogOut extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
           
            <div className="logout-container">
            <h2>Warning!</h2>
            <p>Are you sure you want to log out?</p>
            <Link className="btn btn-danger" to="../html/user_index.html">Yes, Log Out</Link>
            <p id="logout-message" style={{"display":"none","color":"red","margin-top":"10px"}}>Logging out...</p>
          </div>
          

        );
    }
}