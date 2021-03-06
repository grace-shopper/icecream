import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import SvgIcon from 'material-ui/SvgIcon';

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
		} else if(type === "profile") {
			this.props.history.push(`/users/${this.props.currentUser.id}`)
		} else if(type === "all_orders") {
			this.props.history.push(`/all_orders/`)
		} else if(type === "cart") {
			this.props.history.push('/cart')
		}
		this.setState({ open: false });
	}

	render() {
		const { currentUser } = this.props
		return (
			<div>
				<AppBar
					title="Gracey Hopper's Ice Screamatorium"
					onLeftIconButtonTouchTap={this.handleToggle}
				>
				<Drawer docked={false}
					width={200}
					open={this.state.open}
					onRequestChange={(open) => this.setState({ open })}>
					{
						(Object.keys(currentUser).length)
							? [<MenuItem key="logout" onClick={this.handleLogout}>Logout <small>{currentUser.email} </small></MenuItem>,
								 <MenuItem key="order" onClick={(e)=> {this.handleLink(e, "order")}}>Order History</MenuItem>]

							: [<MenuItem key="login" onClick={(e)=>{this.handleLink(e, "login")}}>Login</MenuItem>,
							<MenuItem key="signup" onClick={(e)=>{this.handleLink(e, "signup")}}>Sign Up</MenuItem>]
					}
					<MenuItem onClick={(e)=>{this.handleLink(e, "products")}}>Products</MenuItem>
					<MenuItem onClick={(e)=>{this.handleLink(e, "cart")}}>Your Cart</MenuItem>
					{(Object.keys(currentUser).length && currentUser.isAdmin) 
						? <MenuItem onClick={(e)=> {this.handleLink(e, "all_orders")}}>All Orders</MenuItem>
						: null
					}
				</Drawer>
				<Badge
				badgeStyle= {{top: 20, right: 25, width: "15px", height: "15px", padding: "0px", margin: "0px", border: "0px"}}
				badgeContent={this.props.cart && this.props.cart.quantity ? this.props.cart.quantity : ''}
				>
				<div style={{paddingBottom:"10px", paddingTop: "0px"}}>
				<IconButton
					iconStyle={{top: 0}}
					tooltip="Your Cart"
					className="cart-button"
					onClick={(e)=>this.handleLink(e,"cart")}>
						<img width="30px" src='/images/shopping_cart.png'/>
				</IconButton>
				</div>
				</Badge>
				</AppBar>
			</div>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => {
  return {
		currentUser: state.currentUser,
		cart: state.cart
  }
}

const mapDispatch = (dispatch, ownProps) => ({
	logout: () => {
		dispatch(logout());
		ownProps.history.push('/')
	}
});

export default withRouter(connect(mapState, mapDispatch)(Navbar));
