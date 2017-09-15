import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

	render() {
		const { currentUser } = this.props
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
							? <MenuItem onClick={this.handleLogout}><Link to="/">Logout</Link> <small>{currentUser.email} </small></MenuItem>

							: [<MenuItem onClick={this.handleClose} key="login"><Link to="/login">Login</Link></MenuItem>,
							<MenuItem onClick={this.handleClose} key="signup"><Link to="/signup">Sign Up</Link></MenuItem>]
					}
					<MenuItem onClick={this.handleClose}><Link to="/products">Products</Link></MenuItem>
					<MenuItem onClick={this.handleClose}><Link to="/cart">Your Cart</Link></MenuItem>
					{
						(Object.keys(currentUser).length)
							? <MenuItem onClick={this.handleClose}><Link to={`/user/${this.props.currentUser.id}`}>Your Profile</Link></MenuItem>
							: null
					}
				</Drawer>
			</div>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ currentUser }) => ({ currentUser });


const mapDispatch = dispatch => ({
	logout: () => {
		dispatch(logout());
	}
});

export default connect(mapState, mapDispatch)(Navbar);
