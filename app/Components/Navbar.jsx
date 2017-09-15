import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { logout } from '../reducers/auth';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
		this.handleClose = this.handleClose.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleLink = this.handleLink.bind(this); 
	}

	handleToggle(e) {
		e.preventDefault();
		this.setState({ open: !this.state.open });
	}

	handleClose(e) {
		this.setState({ open: false });
	}

	handleLogout(e) {
		this.setState({ open: false });
		this.props.logout()
	}

	handleLink(e, type) {
		if(type === "order") {
			this.props.history.push(`/orders/`); 
		} else if(type === "products") {
			this.props.history.push(`/products`); 
		} else if(type === "cart") {
			this.props.history.push(`/cart`); 
		} else if(type === "login") {
			this.props.history.push(`/login`); 
		} else if(type === "signup") {
			this.props.history.push(`/signup`); 
		}
		this.setState({ open: false });
	}

	render() {
		const { currentUser } = this.props
		console.log("hullo", currentUser); 
		return (
			<div>
				<AppBar
					title="Gracey Hopper's Ice Screamatorium"
					onLeftIconButtonTouchTap={this.handleToggle} />
				<Drawer docked={false}
					width={200}
					open={this.state.open}
					onRequestChange={(open) => this.setState({ open })}>
					{
						(Object.keys(currentUser).length)
							? [<MenuItem onClick={this.handleLogout}><Link to="/">Logout</Link> <small>{currentUser.email} </small></MenuItem>, 
								 <MenuItem onClick={(e)=> {this.handleLink(e, "order")}}>Order History</MenuItem>]

							: [<MenuItem onClick={(e)=>{this.handleLink(e, "login")}}>Login</MenuItem>,
							<MenuItem onClick={(e)=>{this.handleLink(e, "signup")}}>Sign Up</MenuItem>]
					}
					<MenuItem onClick={(e)=>{this.handleLink(e, "products")}}>Products</MenuItem>
					<MenuItem onClick={(e)=>{this.handleLink(e, "cart")}}>Your Cart</MenuItem>
					{
						(Object.keys(currentUser).length)
							? <MenuItem onClick={this.handleClose}><Link to="/user/:userId">Your Profile</Link></MenuItem>
							: null
					}
				</Drawer>
			</div>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ currentUser  }) => ({ currentUser });


const mapDispatch = (dispatch) => ({
	logout: () => {
		dispatch(logout());
	}
});

export default withRouter(connect(mapState, mapDispatch)(Navbar));
