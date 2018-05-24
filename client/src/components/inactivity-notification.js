import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';

export class InactivityNotification extends React.Component {
  constructor(props){
    super(props);
  }
  
  
  render(){
    if(this.display){
      return (
        <div>
          About to auto logout   
        </div>
      )
    } else {
      return(<div></div>);
    }
  }

}

export default requiresLogin()(connect()(InactivityNotification));
