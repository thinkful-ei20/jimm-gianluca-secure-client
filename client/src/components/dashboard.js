import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import {clearAuth} from '../actions/auth';
import DialogBox from './dialog-box';

export class Dashboard extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchProtectedData());
		this.startSessionInterval();
	}

	componentDidUpdate() {
		this.stopSessionInterval();
		this.startSessionInterval();
	}

	startSessionInterval() {
		this.dialogBoxInterval = setInterval(
			() => {
				this.showLogoutDialog = true;
				console.log('show dialog box');
			},
			4000
		);
		this.sessionInterval = setInterval(
			() => this.props.dispatch(clearAuth()),
			11000//5 * 60 * 1000 // After 5 minutes of inactivity, make user log back in
		);
	}

	stopSessionInterval() {
		if(this.sessionInterval) {
			clearInterval(this.sessionInterval);
		}
		if(this.dialogBoxInterval) {
			clearInterval(this.dialogBoxInterval);
		}
	}

	render() {
		const dialog = this.showLogoutDialog ? <DialogBox/> : undefined;
		return (
			<div className="dashboard">
				{dialog}
				<div className="dashboard-username">
                    Username: {this.props.username}
				</div>
				<div className="dashboard-name">Name: {this.props.name}</div>
				<div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const {currentUser} = state.auth;
	return {
		username: state.auth.currentUser.username,
		name: `${currentUser.firstName} ${currentUser.lastName}`,
		protectedData: state.protectedData.data
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
