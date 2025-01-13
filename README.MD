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

## Coverage results

```bash
 ✓ test/app-root.test.js (6) 359ms
 ✓ test/i18n/i18n.test.js (4)
 ✓ test/logic/game-logic.test.js (6)
 ✓ test/components/animated-wave-background/animated-wave-background.test.js (3)
 ✓ test/components/btn-action/btn-action.test.js (6)
 ✓ test/components/countdown-timer/countdown-timer.test.js (5)
 ✓ test/components/error-message/error-message.test.js (5)
 ✓ test/components/language-selector/language-selector.test.js (6)
 ✓ test/views/home/home-view.test.js (4)
 ✓ test/views/game/game-view.test.js (9)
 ✓ test/components/text-dialog/text-dialog.test.js (4)

 Test Files  11 passed (11)
      Tests  58 passed (58)
   Start at  11:41:19
   Duration  7.43s (transform 67ms, setup 0ms, collect 306ms, tests 613ms, environment 2.40s, prepare 452ms)

 % Coverage report from v8
-----------------------------------------|---------|----------|---------|---------|-------------------
File                                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------------------------|---------|----------|---------|---------|-------------------
All files                                |    97.6 |    92.47 |   96.82 |    97.6 |                   
 src                                     |     100 |      100 |     100 |     100 |                   
  app-root.css.js                        |     100 |      100 |     100 |     100 |                   
  app-root.js                            |     100 |      100 |     100 |     100 |                   
 src/components/animated-wave-background |     100 |      100 |     100 |     100 |                   
  animated-wave-background.css.js        |     100 |      100 |     100 |     100 |                   
  animated-wave-background.js            |     100 |      100 |     100 |     100 |                   
 src/components/btn-action               |     100 |      100 |     100 |     100 |                   
  btn-action.css.js                      |     100 |      100 |     100 |     100 |                   
  btn-action.js                          |     100 |      100 |     100 |     100 |                   
 src/components/countdown-timer          |   91.13 |    88.88 |     100 |   91.13 |                   
  countdown-timer.css.js                 |     100 |      100 |     100 |     100 |                   
  countdown-timer.js                     |   87.27 |    88.88 |     100 |   87.27 | 46-52             
 src/components/error-message            |     100 |      100 |     100 |     100 |                   
  error-message.css.js                   |     100 |      100 |     100 |     100 |                   
  error-message.js                       |     100 |      100 |     100 |     100 |                   
 src/components/language-selector        |     100 |    85.71 |     100 |     100 |                   
  language-selector.css.js               |     100 |      100 |     100 |     100 |                   
  language-selector.js                   |     100 |    85.71 |     100 |     100 | 40                
 src/components/text-dialog              |     100 |      100 |     100 |     100 |                   
  text-dialog.css.js                     |     100 |      100 |     100 |     100 |                   
  text-dialog.js                         |     100 |      100 |     100 |     100 |                   
 src/constants                           |     100 |      100 |     100 |     100 |                   
  game-constants.js                      |     100 |      100 |     100 |     100 |                   
  language-constants.js                  |     100 |      100 |     100 |     100 |                   
 src/i18n                                |     100 |      100 |     100 |     100 |                   
  i18n.js                                |     100 |      100 |     100 |     100 |                   
 src/logic                               |   93.25 |    93.33 |     100 |   93.25 |                   
  game-logic.js                          |   93.25 |    93.33 |     100 |   93.25 | 8-9,64-65,74-75   
 src/mixins                              |   95.34 |      100 |      75 |   95.34 |                   
  i18n-mixin.js                          |   95.34 |      100 |      75 |   95.34 | 44-45             
 src/views/game                          |    96.1 |       85 |     100 |    96.1 |                   
  game-view.css.js                       |     100 |      100 |     100 |     100 |                   
  game-view.js                           |   95.06 |       85 |     100 |   95.06 | 139-143,157-163   
 src/views/home                          |   95.89 |     87.5 |   85.71 |   95.89 |                   
  home-view.css.js                       |     100 |      100 |     100 |     100 |                   
  home-view.js                           |   94.54 |     87.5 |   85.71 |   94.54 | 48-50,61-63       
-----------------------------------------|---------|----------|---------|---------|-------------------
```

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
│   │   ├── countdown-timer
│   │   │   ├── countdown-timer.css.js
│   │   │   └── countdown-timer.js
│   │   ├── error-message
│   │   │   ├── error-message.css.js
│   │   │   └── error-message.js
│   │   ├── language-selector
│   │   │   ├── language-selector.css.js
│   │   │   └── language-selector.js
│   │   └── text-dialog
│   │       ├── text-dialog.css.js
│   │       └── text-dialog.js
│   ├── constants
│   │   ├── game-constants.js
│   │   └── language-constants.js
│   ├── i18n
│   │   ├── i18n.js
│   │   └── locales
│   │       ├── en.js
│   │       ├── es.js
│   │       └── pt.js
│   ├── mixins
│   │   └── i18n-mixin.js
│   ├── services
│   │   └── game-logic.js
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
│   │   ├── countdown-timer
│   │   │   └── countdown-timer.test.js
│   │   ├── error-message
│   │   │   └── error-message.test.js
│   │   ├── language-selector
│   │   │   └── language-selector.test.js
│   │   └── text-dialog
│   │       └── text-dialog.test.js
│   ├── i18n
│   │   └── i18n.test.js
│   ├── logic
│   │   └── game-logic.test.js
│   └── views
│       ├── game
│       │   └── game-view.test.js
│       └── home
│           └── home-view.test.js
├── vercel.json
├── vite.config.js
└── vitest.config.js
```

## Deployment

1. Build the application for production:

  ```bash
  npm run build
  ```

2. Serve the generated `dist` folder with a static server like `serve` or deploy it on platforms like gh-pages, Netlify, Render, Vercel...

## Example Production Deployment

The application is deployed using Vercel and accessible via the following URL:

- **Web Application**: [Memory Card App](https://memory-card-app-gamma.vercel.app/)

Visit the link to see the live version of the application.

## Technical Characteristics

- Framework: Lit
- Design: Native CSS with reusable components.
- PWA: Support for desktop and mobile device installation.
- Performance: Lightweight and efficient design

## Contact

Author: Francisco Javier Antúnez Durán
Web: [https://rootdevs.es/](https://rootdevs.es/)
