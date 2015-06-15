'use strict';

var $ = require('jquery');
var React = require('react');
var Navigation = require('react-router').Navigation;

var UserActions = require('user-actions');
var Spinner = require('components/spinner');
var gettext = require('utils').gettext;


module.exports = React.createClass({

  displayName: 'LoginView',

  mixins: [Navigation],

  getInitialState: function() {
    return {
      is_logged_in: false,
    };
  },

  componentDidMount: function() {
    var { router } = this.context;
    $.ajax({
      data: {
        access_token: router.getCurrentQuery().access_token,
      },
      method: 'post',
      url: '/api/auth/sign-in/',
      context: this,
    }).then(function(data) {
      if (this.isMounted()) {
        this.setState({'is_logged_in': true}); // eslint-disable-line

        UserActions.setCurrentUser({email: data.buyer_email});

        console.log('setting CSRF token for subsequent requests:', data.csrf_token);
        $.ajaxSetup({
          headers: {
            "X-CSRFToken": data.csrf_token,
          },
        });

        this.transitionTo('card-listing');
      }
    }).fail(function() {
      // TODO: some error state.
      console.log('login failed');
    });
  },

  contextTypes: {
    router: React.PropTypes.func,
  },

  render: function() {
    return <Spinner text={gettext('Logging in')}/>;
  },
});
