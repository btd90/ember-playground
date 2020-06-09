import Route from '@ember/routing/route';

/**
 * Error route file.
 */
export default Route.extend({
    // Redirect to valid route
    redirect() {
        this.transitionTo('home.index');
    },
});
