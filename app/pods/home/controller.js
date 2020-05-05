import Controller from '@ember/controller';

/**
 * Controller for home route.
 */
export default Controller.extend({
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
  },
});
