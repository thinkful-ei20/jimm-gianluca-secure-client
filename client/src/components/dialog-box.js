import React, {Component} from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import {clearAuth, setAuthToken} from '../actions/auth';

class DialogBox extends Component {
	render() {
		return(
			<div className="dialog-box">
				<p>Would you like to remain in this session?</p>
				<button onClick={this.props.dispatch(setAuthToken())}>Yes</button>
				<button onClick={this.props.dispatch(clearAuth())}>No, Logout</button>
			</div>
		);
	}
}

export default requiresLogin()(connect()(DialogBox));