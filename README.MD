# Memory Card App - PWA

## Description

Welcome to Memory Card App, a progressive web application (PWA) based on the classic game “Memory Card App”. The app allows users to register their name, select difficulty levels and earn points by “remembering” the correct number and card that appear randomly on a grid.

## Features

- The application must functionally contain, as a minimum, the instructions detailed in the statement.
- The code must be public
- Unit tests of the views and components of the application must be performed.
- Any public hosting infrastructure such as Vercel, Netlify or Github Pages may be used.
- A README.md file must be uploaded to the repository with the instructions to run the application locally. You can add any other data you consider necessary.

## Installation

1. Clone the repository:

  ```sh
  git clone https://github.com/...
  ```

2. Navigate to the project directory:

  ```sh
  cd memory-card-app
  ```

3. Install the dependencies:

  ```sh
  npm install
  ```

## How to use

1. Start the application:

  ```bash
  npm start
  ```

2. Open your browser and navigate to `http://localhost:5173`.

## Test

1. To run the tests, use the following command:

  ```bash
  npm run test
  ```

2. To run the tests in watch mode, use the following command:

  ```bash
  npm run test:watch
  ```

3. To generate a code coverage report, use the following command:

  ```bash
  npm run test:coverage
  ```

The coverage report will be generated in the coverage folder. You can open the index.html file inside that folder in your browser to see a detailed coverage report.

## Project Structure

```bash
.
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── index.html
├── package-lock.json
├── package.json
├── README.MD
├── public
│   └── images
│       ├── favicon.webp
│       └── memory.webp
├── src
│   ├── app-root.css.js
│   ├── app-root.js
│   ├── components
│   │   ├── animated-wave-background
│   │   │   ├── animated-wave-background.css.js
│   │   │   └── animated-wave-background.js
│   │   ├── btn-action
│   │   │   ├── btn-action.css.js
│   │   │   └── btn-action.js
│   │   ├── error-message
│   │   │   ├── error-message.css.js
│   │   │   └── error-message.js
│   │   ├── language-selector
│   │   │   ├── language-selector.css.js
│   │   │   └── language-selector.js
│   │   └── timer-game
│   │       ├── timer-game.css.js
│   │       └── timer-game.js
│   ├── constants
│   │   ├── game-constants.js
│   │   └── language-constants.js
│   ├── i18n
│   │   ├── i18n.js
│   │   └── locales
│   │       ├── en.json
│   │       ├── es.json
│   │       └── pt.json
│   ├── logic
│   │   └── game-logic.js
│   ├── mixins
│   │   └── i18n-mixin.js
│   └── views
│       ├── game
│       │   ├── game-view.css.js
│       │   └── game-view.js
│       └── home
│           ├── home-view.css.js
│           └── home-view.js
├── test
│   ├── app-root.test.js
│   ├── components
│   │   ├── animated-wave-background
│   │   │   └── animated-wave-background.test.js
│   │   ├── btn-action
│   │   │   └── btn-action.test.js
│   │   ├── error-message
│   │   │   └── error-message.test.js
│   │   ├── language-selector
│   │   │   └── language-selector.test.js
│   │   └── timer-game
│   │       └── timer-game.test.js
│   ├── i18n
│   │   └── i18n.test.js
│   └── views
│       ├── game
│       │   └── game-view.test.js
│       └── home
│           └── home-view.test.js
└── vitest.config.js
```

## Deployment

1. Build the application for production:

  ```bash
  npm run build
  ```

2. Serve the generated `dist` folder with a static server like `serve` or deploy it on platforms like Netlify.

## Technical Characteristics

- Framework: Lit
- Design: Native CSS with reusable components.
- PWA: Support for desktop and mobile device installation.
- Performance: Lightweight and efficient design

## Contact

Author: Francisco Javier Antúnez Durán
Web: [https://rootdevs.es/](https://rootdevs.es/)
