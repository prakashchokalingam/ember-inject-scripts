import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: 'hash',
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('/');
});

export default Router;
