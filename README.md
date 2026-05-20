# Greenbone-Hesham

This repository contains the implementation of the Greenbone AG coding challenge. It provides end-to-end automated tests for the SauceDemo application using Playwright and TypeScript, following the Page Object Model (POM) pattern.

## Tech stack

- Playwright
- TypeScript
- Page Object Model (POM)

---

## Project structure

```text
project-root/
├── pages/                      # Page objects (POM)
│   ├── CartPage.ts
│   ├── CheckoutCompletePage.ts
│   ├── CheckoutInformationPage.ts
│   ├── CheckoutOverviewPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
├── tests/                      # Test specs
│   ├── authentication.spec.ts
│   └── checkout-flow.spec.ts
├── playwright.config.ts        # Playwright configuration
├── package.json
└── README.md
```

## Structure explanation

- `pages/` — contains all Page Object Model classes. Each page object encapsulates locators and page actions to keep tests clean and reusable.
- `tests/` — contains automated test scenarios:
  - `authentication.spec.ts` — authentication and login validation.
  - `checkout-flow.spec.ts` — checkout happy path and validation scenarios.

## Implemented test scenarios

- Authentication tests
  - Invalid username with valid password
  - Valid username with invalid password
  - Invalid username with invalid password

- Checkout flow tests
  - Successful checkout process (happy path)
  - Validation of required personal information
  - Product price consistency across inventory, cart, and checkout overview pages

## Installation

### Prerequisites

- Node.js (LTS recommended)
- npm

Download Node.js: https://nodejs.org/

### Install dependencies

Run this in the project root:

```bash
npm install
```

## Running tests

- Run all tests:

```bash
npm test
```

- Run smoke tests:

```bash
npm run test:smoke
```

- Run tests in headed (UI) mode:

```bash
npm run test:ui
```

- Open Playwright HTML report:

```bash
npx playwright show-report
```

## Browser configuration

The project is configured to run on Chromium (Desktop Chrome) by default. See `playwright.config.ts` for configuration details. Additional browsers (Firefox, WebKit, mobile) can be added as needed.

## Best practices used

- Page Object Model (POM)
- Reusable page actions
- Separation of test logic and UI logic
- Dynamic validations instead of hardcoded values
- Clear and descriptive test names
- Smoke test tagging
- Data-driven testing for authentication scenarios
- Clean and maintainable test structure

## Contribution guide

When contributing:

- Follow the existing POM structure in `pages/`
- Keep tests readable and maintainable
- Avoid duplicated code
- Use meaningful method and test names
- Keep assertions focused on business behavior
- Run formatting before committing:

```bash
npm run format
```
