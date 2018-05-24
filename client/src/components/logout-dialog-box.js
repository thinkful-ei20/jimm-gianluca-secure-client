import React, {Component} from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import {clearAuth,setDialog} from '../actions/auth';

class LogoutDialogBox extends Component {

	componentDidMount() {
		this.startLogoutInterval();
	}

	startLogoutInterval() {
		this.logoutInterval = setInterval(() => {
			this.props.dispatch(clearAuth());
			this.resetSession();
		}, 1 * 60 * 1000);
	}

	resetSession() {
		this.props.dispatch(setDialog(false));
		clearInterval(this.logoutInterval);
	}

	render() {
		return(
			<div className="dialog-box">
				<p>You will be logged out in 1 min, would you like to continue the session?</p>
				<button onClick={() => this.resetSession() }>Continue Session</button>
			</div>
		);
	}
}

export default requiresLogin()(connect()(LogoutDialogBox));