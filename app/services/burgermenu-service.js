import Service from '@ember/service';

/**
 * Service to aid burger menu operations.
 */
export default Service.extend({

  menuOpen: false,

  toggleBurger: function () {
    this.set('menuOpen', !this.get('menuOpen'));
  }
})
