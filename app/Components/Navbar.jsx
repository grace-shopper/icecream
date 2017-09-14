import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			open: false
		}
		this.handleClose = this.handleClose.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
	}

	handleToggle(e) {
		e.preventDefault();
		this.setState({ open: !this.state.open });
	}

	handleClose(e) {
		this.setState({ open: false });
	}

	render() {
		return (
			<div>
				<AppBar
					title="Gracey Hopper's Ice Screamatorium"
					onLeftIconButtonTouchTap={this.handleToggle} />
				<Drawer docked={false}
					width={200}
					open={this.state.open}
					onRequestChange={(open) => this.setState({ open })}>
					<MenuItem onClick={this.handleClose}><Link to="/">Login</Link></MenuItem>
					<MenuItem onClick={this.handleClose}><Link to="/">Sign Up</Link></MenuItem>
					{
						(this.state.isLoggedIn)
							? <MenuItem onClick={this.handleClose}><Link to="/">Logout</Link></MenuItem>
							: null
					}
					<MenuItem onClick={this.handleClose}><Link to="/products">Products</Link></MenuItem>
					<MenuItem onClick={this.handleClose}><Link to="/search">Search for Items</Link></MenuItem>
					<MenuItem onClick={this.handleClose}><Link to="/cart">Your Cart</Link></MenuItem>
					{
						(this.state.isLoggedIn)
							? <MenuItem onClick={this.handleClose}><Link to="/">Your Profile</Link></MenuItem>
							: null
					}
				</Drawer>
			</div>
		)
	}
}
