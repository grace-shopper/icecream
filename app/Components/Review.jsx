import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { Rating } from 'material-ui-rating'
import { fetchReviews } from '../reducers';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      // controls whether the box to submit reviews is open or not
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleOpen() {
		this.setState({ open: true });
	}
  handleClose() {
		this.setState({ open: false });
	}
  handleSubmit() {
    // todo: submit info to reviews post
    console.log('submitting a review...')
    this.setState({
      open: false
    })
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
                title={`Submit a Review for ${productName}`}
                actions={actions}
                modal={true}
                open={this.state.open}
              >
              TODO: add form to add review here
              </Dialog>
              <br />
            </div>
          }
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
