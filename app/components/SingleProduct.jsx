import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios'; 

export default class SingleProduct extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  	console.log(this.props)
  }

  render() {
  	console.log("hello"); 
  	return (
  		<div> hi</div> 
  	)
  }

}
