import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton'; 
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog'; 
import TextField from 'material-ui/TextField';

import {fetchProducts, getProduct, updateProductAsAdmin } from '../reducers';

export class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	inventoryArr: [], 
      open: false,
      title: '', 
      description: '', 
      inventory: '', 
      imageName: ''
    }
    this.createInventoryArr = this.createInventoryArr.bind(this);
    this.onSubmit = this.onSubmit.bind(this); 
    this.handleOpen = this.handleOpen.bind(this); 
    this.onChange = this.onChange.bind(this); 
  }
  createInventoryArr(product) {
  	let inventory = [];
		for(let i=1; i<=product.inventory; i++) {
			inventory.push(i);
		}
		return inventory;
  }

  handleOpen(event) {
    this.setState({open: true}); 
  }

  onChange(event) {
    this.setState({ [event.target.name] : event.target.value})
  }

  onSubmit(event) {
    event.preventDefault(); 
    const product = { title: this.state.title, description: this.state.description, inventory: this.state.inventory, imageName: this.state.imageName }; 
    this.props.updateProductAsAdmin(product); 
    this.setState({open:false}); 

  }

  componentDidMount() {
		const productId = this.props.match.params.productId;

		this.props.updateChosenProduct(productId)
			.then(()=>{
				const inventoryArr = this.createInventoryArr(this.props.currentProduct);
				this.setState({inventoryArr})
			});
  };

	// need to update link to go to a particular users id
  render() {
    const actions = [ <FlatButton
        label="Submit"
        primary={true}
        type="submit"
        keyboardFocused={true}
      />]; 
    const style = { marginLeft: 20, }; 
  	return (
  		<div>
  		<div className="row">
  			<div className="col-sm-6 col-md-6 col-lg-6">
  				<h2 className="text-center">{this.props.currentProduct.title} </h2>
  				<img src={`/images/${this.props.currentProduct.imageName}`} />
  			</div>
  			<div className="col-sm-6 col-md-6 col-lg-6">
  				<div>
  					<b>Description:  </b>
  					{this.props.currentProduct.description}
  				</div>
  				<div>
  					<b>Price: </b>
  					{this.props.currentProduct.price}
  				</div>
  				<div>
  					<form>
  						<label><b>Quantity:</b></label>
  						<select className="form-control">
  							{
  								this.state.inventoryArr.map(num => {
  									return (
  										<option key={num} value={num}>{num}</option>
  									)
  								})
  							}
							</select>
							<NavLink to={`/cart`}>
	  					<button className="btn btn-default">
	  						Add to Cart
							</button>
							</NavLink>
	  				</form>
  				</div>

          <div>
            <RaisedButton label="Modify" onClick={this.handleOpen} />      
            <Dialog modal={false} open={this.state.open} modal={false} onClick={this.handleClose} >
            <form onSubmit={this.onSubmit}>  
              <TextField name="title" hintText={this.props.currentProduct.title} onChange={this.onChange} /><br /> 
              <TextField name="description" hintText={this.props.currentProduct.description} onChange={this.onChange} /> <br /> 
              <TextField name="inventory" hintText={this.props.currentProduct.inventory} onChange={this.onChange} /> <br />                 
              <TextField name="imageName" hintText={this.props.currentProduct.imageName} onChange={this.onChange} /> <br />
              <RaisedButton type="submit" label="submit" primary={true} />
            </form> 
            </Dialog>
          </div> 
  			</div>
  		</div>
  		</div>
  	)
  }

}

const mapStateToProps = function (state) {
  return {
    //on modify button add property disabled={this.props.currentUser.isAdmin}
    currentProduct: state.currentProduct,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    updateChosenProduct: function(product) {
      return dispatch(getProduct(product))
    }, 
    updateProductAsAdmin: function(modProduct) {
      Object.keys(modProduct).forEach((key) => (modProduct[key] === '' || modProduct[key] === null) && delete modProduct[key]); 
      const id = ownProps.match.params.productId; 
      return dispatch(updateProductAsAdmin(id, modProduct)); 

    }
  }
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

export default SingleProductContainer;
