import { test as base, expect } from "@playwright/test";
import { LogIn } from "../pages/log-in.page";
import { Table } from "../pages/table.page";

interface Fixtures {
  logIn: LogIn;
  table: Table;
}

const test = base.extend<Fixtures>({
  logIn: async ({ page }, use) => {
    await use(new LogIn(page));
  },
  table: async ({ page }, use) => {
    await use(new Table(page));
  },
});
export { test, expect };
