import React, { Component } from 'react';
import { getReviews } from '../reducers';
import { connect } from 'react-redux';

export class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
  }

  componentDidMount() {
		const productId = this.props.match.params.productId;
		this.props.updateChosenProduct(productId)
			.then(()=>{
				const reviews = this.getReviews(this.props.currentProduct)
				this.setState({reviews})
			});
	};

  getReviews(product) {
    let reviews = [];
    for (let i = 1; i <= product.reviews; i++) {
      inventoryArr.push(i);
    }
    return reviews;
  }

  render() {
    return (
      <div>
        <p> This is a review </p>
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
