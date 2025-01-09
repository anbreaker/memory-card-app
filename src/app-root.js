import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';

// Internationalization
import { i18nMixin } from './mixins/i18n-mixin.js'; // Importar el mixin

// Components
import './components/animated-wave-background/animated-wave-background.js';
import './components/error-message/error-message.js';
import './components/language-selector/language-selector.js';

// Views
import './views/home/home-view.js';
import './views/game/game-view.js';

// Styles
import styles from './app-root.css.js';

class AppRoot extends i18nMixin(LitElement) {
  /**
   * Retrieves the styles for the component.
   * @returns {Array} An array containing the styles.
   */
  static get styles() {
    return [styles];
  }

  /**
   * Defines the properties for the component.
   */
  static get properties() {
    return {
      name: { type: String },
    };
  }

  /**
   * Creates an instance of the AppRoot class.
   */
  constructor() {
    super();

    this.name = '';
    this.router = null;
  }

  /**
   * Called when the element's DOM has been updated for the first time.
   * Initializes the router and sets up the routes for the application.
   * Synchronizes the player's name from localStorage.
   *
   * @async
   * @method firstUpdated
   */
  async firstUpdated() {
    const game = this.shadowRoot.querySelector('#game');
    this.router = new Router(game);

    // Synchronizes the name from localStorage when loading the application
    this.name = localStorage.getItem('playerName') || '';

    this.router.setRoutes([
      { path: '/', component: 'home-view' },
      {
        path: '/game',
        action: (context, commands) => this.guardGameRoute(context, commands),
        component: 'game-view',
      },
      { path: '(.*)', redirect: '/' },
    ]);
  }

  /**
   * Guards the game route by checking if a player name is stored.
   * If the player name is not found in the local storage or is an empty string,
   * it redirects to the home route ('/').
   *
   * @param {Object} context - The context object provided by the router.
   * @param {Object} commands - The commands object provided by the router, used for redirection.
   * @returns {Object|undefined} - Returns a redirection command if the player name is not found, otherwise undefined.
   */
  guardGameRoute(context, commands) {
    // get name of localStorage if it is not defined in property
    const storedName = this.name || localStorage.getItem('playerName');

    if (!storedName || storedName.trim() === '') {
      // Redirect to home (/) if there is no name
      return commands.redirect('/');
    }

    this.name = storedName;
  }

  /**
   * Renders the main application structure.
   *
   * @returns {TemplateResult} The HTML template for the app root.
   */
  render() {
    return html`
      <div class="app">
        <nav>
          <a href="/">
            <img class="logo" src="../images/memory.webp" alt="logo-game" />
          </a>
          <language-selector></language-selector>
        </nav>

        <div id="game"></div>
        <error-message></error-message>
        <animated-wave-background></animated-wave-background>
      </div>
    `;
  }
}

customElements.define('app-root', AppRoot);
