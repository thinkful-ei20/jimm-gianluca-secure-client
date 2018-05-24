import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import { clearAuth } from '../actions/auth';
import InactivityNotification from './inactivity-notification';

export class Dashboard extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchProtectedData());
	}

	componentDidUpdate() {
		this.stopSessionTimeout()
		if(this.props.loggedIn){
			this.startSessionTimeout()
		}
	}
	
	stopSessionTimeout(){
		if (this.sessionInterval) {
			clearInterval(this.sessionInterval);
		}
		if (this.inactivityNotifyInterval){
			clearInterval(this.inactivityNotifyInterval);
			this.displayInactivityNotification = false;
		}
		return;
	}

	startSessionTimeout(){
		this.sessionInterval = setInterval(
			() => {
				this.props.dispatch(clearAuth());
				console.log('logging out due to inactivity');
				this.displayInactivityNotification = false;
				clearInterval(this.sessionInterval);
				clearInterval(this.inactivityNotifyInterval);
			},
			5*1*1000
		);
		this.inactivityNotifyInterval = setInterval(
			() => {
				this.displayInactivityNotification = true
				console.log('about to log out from inactivity');
			},
			3*1*1000
		)

	}


	render() {

		return (
			<div className="dashboard">
				<InactivityNotification display={this.displayInactivityNotification}/>
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
		protectedData: state.protectedData.data,
		loggedIn: state.auth.currentUser !== null
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
