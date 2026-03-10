# Project Overview

This project contains automated tests developed for BOL Validation tool.

> **Important**
>
> - Tests are configured to run against **DEV ENV**.
> - You can switch to **STG** or **PROD** by updating the `.env` credentials.
> - If you switch environments, you may need to update screenshots depending on what fails.
> - Make sure your **VPN is up and running** before executing tests.

# Setup

- clone the repository to your local machine,
- add .env file to the root of the project,
- run the following command to install dependencies:

```bash
  npm install
```

# Environment Configuration

The `.env` file stores sensitive data such as:

- User credentials
- API endpoints

Before running the tests, ensure your `.env` file is properly configured with valid endpoints and user data.

# Running Tests

- When you will first time run the tests, make sure your user credentials are saved in a JSON file via Global setup.
- While actively running the suite, you can comment out line 36 in file playwright.config.ts (global setup project) so we don't run log in each time we run tests.
- When tokens expire, you can uncomment that part again, run tests to log in the user and save the storage state, and comment it out again.
- Make sure you don't commit to repository the config file with line 36 being commented out as it can fails tests and create confusion for the future.

- **Headless mode (default):**

```bash
  npm run test
```

- **Headed mode (visible browser):**

```bash
  npm run test:headed
```

- **Debug mode:**

```bash
  npm run test:debug
```

- **UI mode:**

```bash
  npm run test:ui
```

- **Flaky Test Retry**
  - runs tests with automatic retries (3 attempts):

```bash
  npm run test:flaky
```

- **Generate Test Report**

```bash
  npm run report
```

# Global Setup

The project includes a **global setup** that:

- Logs in the user
- Captures the storage state
- Saves it for reuse across specific tests

This helps to:

- Reduce test execution time
- Optimize resource usage
- Avoid repeated login steps

# Project Structure

### `BOLs/`

Contains screenshots of BOLs that are used for upload during tests.

### `fixtures/`

Test fixtures configuration.

### `pages/`

Page Object Model implementations.

### `tests/`

Test specifications.

### `util/`

Utility functions, including:

- Image upload to S3
- Deletion of BOLs via API endpoint
