import Controller from '@ember/controller';

/**
 * Controller for about route.
 */
export default Controller.extend({
  show: false,

  actions: {
    toggleAction(burger) {
      burger.state.actions.toggle();
      this.set('show', !this.get('show'));
    },
  },
});
