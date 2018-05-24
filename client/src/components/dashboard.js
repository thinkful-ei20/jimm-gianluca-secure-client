import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
// import {clearAuth} from '../actions/auth';
import LogoutDialogBox from './logout-dialog-box';

export class Dashboard extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchProtectedData());
	}

	render() {
		const dialog = this.props.dialog ? <LogoutDialogBox/> : undefined;
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
		protectedData: state.protectedData.data,
		dialog: state.auth.dialog
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
