import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { Rating } from 'material-ui-rating'
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
				this.setState({reviews: reviews})
			});
	}

  render() {
    const productReviews = this.props.reviews;

    return (
      <div className="container review">
        <br />
        <h3 className="review-header"> Ratings & Reviews </h3>
          {
          productReviews && productReviews.map( review => (
            <Card key={review.id}>>
              <CardHeader
                title={"Review"}
              />
              <Rating
                value={review.rating}
                max={5}
                readOnly={true}
              />
              <CardText> {review.content} </CardText>
            </Card>
          ))
          }
      </div>
    )
  }

}

const mapStateToProps = function (state) {
	return {
		reviews: state.reviews
	}
}

const mapDispatchToProps = function (dispatch) {
	return {
		getReviewsForProduct: function (product) {
			return dispatch(fetchReviews(product))
		}
	}
}

const ReviewContainer = connect(mapStateToProps, mapDispatchToProps)(Review);

export default ReviewContainer;
