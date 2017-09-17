import React, { Component } from 'react';
import { getReviews } from '../reducers';
import { connect } from 'react-redux';

export class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
    this.getReviews = this.getReviews.bind(this);
  }

  componentDidMount() {
		const productId = this.props.productId;
		this.props.getReviewsForProduct(productId)
			.then(()=>{
				const reviews = this.getReviews(this.props.currentProduct)
				this.setState({reviews})
			});
	}

  getReviews(product) {
    let reviews = [];
    for (let i = 1; i <= product.reviews; i++) {
      reviews.push(i);
    }
    return reviews;
  }

  render() {
    console.log('RENDERING PROPS FOR REVIEWS', this.props)
    return (
      <div>
        <p> This is a review </p>
      </div>
    )
  }

}


const mapStateToProps = function (state) {
	return {
		reviews: state.reviews
	}
}

const mapDispatchToProps = function (dispatch, ownProps) {
	return {
		getReviewsForProduct: function (product) {
			return dispatch(getReviews(product))
		}
	}
}

const ReviewContainer = connect(mapStateToProps, mapDispatchToProps)(Review);

export default ReviewContainer;
