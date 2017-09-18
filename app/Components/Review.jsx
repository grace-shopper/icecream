import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Rating } from 'material-ui-rating'

import { fetchReviews, postReview } from '../reducers';

export class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      // controls whether the box to submit reviews is open or not
      open: false,
      // for the review
      userRating: 3,
      userReview: ''
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.setRating = this.setRating.bind(this);
    this.changeReview = this.changeReview.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  };

  // handles the dialog modal
  handleOpen() {
		this.setState({ open: true });
	}
  handleClose() {
		this.setState({ open: false });
	}

  // handles changing items inside the form
  setRating(evt) {
    console.log('updating star rating...', evt.target.value)
    this.setState({
      userReview: evt.target.value
    })
  };

  changeReview(evt) {
    this.setState({
      userReview: evt.target.value
    })
  };

  // handles submitting the form
  handleSubmit(evt) {
    evt.preventDefault();

    const review = {
      content: this.state.userReview,
      rating: this.state.userRating,
      productId: this.props.productId,
      userId: this.props.userId || 1
    }

    this.props.addNewReview(review)
    this.setState({ open: false })
  };

  componentDidMount() {
		this.props.getReviewsForProduct(this.props.productId)
			.then(reviews => {
				this.setState({reviews: reviews})
			});
	};

  render() {
    const productReviews = this.props.reviews;
    const productName = this.props.productName;
    // actions are: close form, open form
    const actions =
    [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose}/>,
      <FlatButton label="Submit" primary={true} onClick={this.handleSubmit}/>
    ];

    return (
      <div className="container review">
        <br />
        <h3 className="review-header"> Ratings & Reviews </h3>
          {
          <div className='add-review-form'>
            <RaisedButton label="Add a Review" primary={true} onClick={this.handleOpen}/>
            <br />

            <Dialog
              title={`Write a Review for ${productName}`}
              actions={actions}
              modal={true}
              open={this.state.open}
            >
              <form onSubmit={this.onSubmit}>
                <Rating
                  value={this.state.userRating}
                  max={5}
                  onChange={this.setRating}
                />
                <TextField
                  hintText="Write your review here"
                  floatingLabelText="Review"
                  name="review"
                  fullWidth={true}
                  multiLine={true}
                  onChange={this.changeReview}
                />
                <br />
              </form>
            </Dialog>

            <br />
            </div>
          }
          {
          productReviews && productReviews.map( review => (
            <Card key={review.id}>
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
		},
    addNewReview: function (review) {
      return dispatch(postReview(review))
    }
	}
}

const ReviewContainer = connect(mapStateToProps, mapDispatchToProps)(Review);

export default ReviewContainer;
