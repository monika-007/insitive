import React , { Component } from "react";
import { Link } from "react-router-dom";

export default class Signout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={{
                background: '#f9f9f9',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                maxWidth: '400px',
                margin: '50px auto'
            }}>
                <h2 style={{
                    color: '#dc3545',
                    marginBottom: '15px',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }}>Warning!</h2>
                <p style={{
                    color: '#555',
                    fontSize: '16px',
                    marginBottom: '20px'
                }}>Are you sure you want to log out?</p>
                <Link to="/welcome" style={{
                    display: 'inline-block',
                    padding: '12px 30px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'background 0.3s ease',
                    boxShadow: '0 2px 10px rgba(220, 53, 69, 0.2)'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                >Yes, Log Out</Link>
                <p id="logout-message" style={{
                    display: 'none',
                    color: 'red',
                    marginTop: '15px',
                    fontSize: '14px'
                }}>Logging out...</p>
            </div>
        );
    }
}
