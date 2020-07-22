import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('home', function(){
    this.route('index');
    this.route('flightsv1');
    this.route('flightsv2');
    this.route('editor');
    this.route('about');
  });
  this.route('error', { path: '/*path' });
});

export default Router;
