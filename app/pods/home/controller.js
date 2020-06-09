import Controller from '@ember/controller';

/**
 * Controller for home route.
 */
export default Controller.extend({
  actions: {
    closeBurger(burger) {
      burger.state.actions.close();
    },
    toggleBurger(burger) {
      burger.state.actions.toggle();
    },
  },
});
