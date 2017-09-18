import React from 'react';
import { connect } from 'react-redux';
import { login,loginAndGoToHome, loginWithGoogle } from '../reducers/auth';


/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
    }

    render() {
        const { message } = this.props;
        return (
            <div className="signin-container">
                <div className="buffer local">
                    <form onSubmit={this.onLoginSubmit}>
                        <div className="form-group">
                            <label>email</label>
                            <input
                                name="email"
                                type="email"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>password</label>
                            <input
                                name="password"
                                type="password"
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-block btn-primary">{message}</button>
                    </form>
                </div>
                <div className="or buffer">
                    <div className="back-line">
                        <span>OR</span>
                    </div>
                </div>
                <div className="buffer oauth">
                    <p>
                        <a
                            target="_self"

                            href="/api/auth/google"
                            className="btn btn-social btn-google">
                            <i className="fa fa-google" />
                            <span>{message} with Google</span>
                        </a>
                    </p>
                </div>
            </div>
        );
    }


    //href="/api/auth/google"
    //onClick={this.props.handleGoogleLogin}

    onLoginSubmit(event) {
        event.preventDefault();
        const credentials = {
            email: event.target.email.value,
            password: event.target.password.value,
        };
        const history = this.props.history
        this.props.handleSubmit(credentials, history);
    }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Log in' });

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleSubmit: function(credentials) {
            dispatch(login(credentials))
            ownProps.history.push('/')
        },

        // handleGoogleLogin: function() {
        //     dispatch(loginWithGoogle())
        //     ownProps.history.push('/')
        // }
    }
  }

//const mapDispatch = { login: loginAndGoToHome };


export default connect(mapState, mapDispatchToProps)(Login);
