import Controller from '@ember/controller';

/**
 * Controller for home route.
 */
export default Controller.extend({

  show: false,

  actions: {
    editorRoute() {
      this.transitionToRoute('home.editor');
    },
    indexRoute() {
      this.transitionToRoute('home.index');
    },
    aboutPage() {
      this.transitionToRoute('about');
    },
    toggleAction(burger) {
      burger.state.actions.toggle();
      this.set('show', !this.get('show'));
    },
  },
});
