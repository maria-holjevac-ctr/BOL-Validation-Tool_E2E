import { test as base, expect } from "@playwright/test";
import { LogIn } from "../pages/log-in.page";

interface Fixtures {
  logIn: LogIn;
}

const test = base.extend<Fixtures>({
  logIn: async ({ page }, use) => {
    await use(new LogIn(page));
  },
});
export { test, expect };
