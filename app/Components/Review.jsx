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
		this.props.getReviewsForProduct(this.props.productId)
			.then(reviews => {
				this.setState({reviews})
			});
	}

  render() {
    const productReviews = this.props.reviews
    console.log('SETTING REVIEWS....', productReviews)
    return (
      <div>
        <br />
        <h2> Ratings & Reviews </h2>
          {/*
          productReviews && productReviews.map( review => (
            <ul>
              <li key={review.id}>hello</li>
            </ul>
          )) */}

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
