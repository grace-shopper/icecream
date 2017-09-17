import React, { Component } from 'react';
import { fetchReviews } from '../reducers';
import { connect } from 'react-redux';

export class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
  }

  componentDidMount() {
		const productId = this.props.productId;
		this.props.getReviewsForProduct(productId)
			.then(reviews => {
				this.setState({reviews})
			});
	}

  render() {
    console.log('RENDERING PROPS FOR REVIEWS', this.props.reviews)
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
			return dispatch(fetchReviews(product))
		}
	}
}

const ReviewContainer = connect(mapStateToProps, mapDispatchToProps)(Review);

export default ReviewContainer;
