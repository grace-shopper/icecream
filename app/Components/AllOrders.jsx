import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'; 
import {Tabs, Tab} from 'material-ui/Tabs';
import { fetchAllOrders } from '../reducers';



export class AllOrders extends Component {
	constructor(props) {
		super(); 
		this.state = {
			label: '', 
			orders: []
		}
	}

	selectTab(e, type) {

	}

	componentDidMount() {
		this.props.getAllOrders(); 
	}

	render() {
		const tabStyle={marginTop: "40px"}; 
		const all = this.props.orders.filter(order => {return order.status !== 'In Cart'}); 
		const created = this.props.orders.filter(order => {return order.status === 'Created'}); 
		const processing = this.props.orders.filter(order => {return order.status === 'Processing'}); 
		const cancelled = this.props.orders.filter(order => {return order.status === 'Cancelled'}); 
		const completed = this.props.orders.filter(order => {return order.status === 'Completed'}); 

		const CreateTable = (props) => {
			return (
				<Table> 
					<TableHeader
						displaySelectAll={false}
						adjustForCheckbox={false}
						enableSelectAll={false}> 
						<TableRow> 
							<TableHeaderColumn>User Id</TableHeaderColumn> 
							<TableHeaderColumn>Purchased At</TableHeaderColumn> 
							<TableHeaderColumn>Status</TableHeaderColumn> 
						</TableRow> 
					</TableHeader> 
					<TableBody displayRowCheckbox={false}> 
						{props.orders && props.orders.map(order => {
							return (
								<TableRow> 
									<TableRowColumn>{order.userId}</TableRowColumn> 
									<TableRowColumn>{order.purchasedAt.toLocaleString()}</TableRowColumn> 
									<TableRowColumn>{order.status}</TableRowColumn> 
								</TableRow> 
							)
						})

						}
					</TableBody> 
				</Table> 
			)
		}

		return (
			<Tabs style={tabStyle}>
				<Tab label="All"> 
					<CreateTable orders={all} />
				</Tab> 
				<Tab label="Created"> 
					<CreateTable orders={created} />
				</Tab> 
				<Tab label="Processing"> 
					<CreateTable orders={processing} />
				</Tab> 
				<Tab label="Cancelled"> 
					<CreateTable orders={cancelled} />
				</Tab> 
				<Tab label="Completed"> 
					<CreateTable orders={completed} />
				</Tab> 
			</Tabs>
		)
	}

}; 

const mapStateToProps = function(state) {
	return {
		orders: state.orders
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		getAllOrders: function() {
			return dispatch(fetchAllOrders()); 
		}
	}
}

const AllOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(AllOrders); 
export default AllOrdersContainer;  