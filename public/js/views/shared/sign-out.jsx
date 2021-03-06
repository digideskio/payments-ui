import React, { Component, PropTypes } from 'react';

import Spinner from 'components/spinner';

import { gettext } from 'utils';
import tracking from 'tracking';


export default class SignOut extends Component {

  static propTypes = {
    showSignIn: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    userSignOut: PropTypes.func.isRequired,
  };

  componentDidMount() {
    tracking.setPage('/sign-out');
    if (this.props.user.signedIn) {
      this.props.userSignOut();
    }
  }

  handleShowSignIn = e => {
    e.preventDefault();
    this.props.showSignIn();
  }

  render() {
    if (this.props.user.signedIn) {
      return <Spinner text={gettext('Signing out')}/>;
    } else {
      return (
        <div className="signed-out">
          <p>
            <a className="button quiet" href="#"
              onClick={this.handleShowSignIn}>{gettext('Sign In')}</a>
          </p>
          <p>{gettext('Sign in to add and remove payment methods, ' +
                      'view receipts, and manage subscriptions.')}</p>
        </div>
      );
    }
  }

}
