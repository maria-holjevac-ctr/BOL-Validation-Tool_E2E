import { test as base, expect } from "@playwright/test";
import { LogIn } from "../pages/log-in.page";
import { Table } from "../pages/table.page";
import { ValidBOL } from "../pages/BOL-details-page/valid.page";
import { IllegibleBOL } from "../pages/BOL-details-page/illegible.page";
import { PendingValidationBOL } from "../pages/BOL-details-page/pending-validation.page";
import { DuplicatedBOL } from "../pages/BOL-details-page/duplicate.page";
import { GeneralDetails } from "../pages/BOL-details-page/general-details.page";
import { ExtractionFailedBOL } from "../pages/BOL-details-page/extraction-failed.page";

interface Fixtures {
  logIn: LogIn;
  table: Table;
  validBOL: ValidBOL;
  illegibleBOL: IllegibleBOL;
  pendingValidationBOL: PendingValidationBOL;
  duplicatedBOL: DuplicatedBOL;
  extractionFailedBOL: ExtractionFailedBOL;
  generalDetails: GeneralDetails;
}

const test = base.extend<Fixtures>({
  logIn: async ({ page }, use) => {
    await use(new LogIn(page));
  },
  table: async ({ page }, use) => {
    await use(new Table(page));
  },
  validBOL: async ({ page }, use) => {
    await use(new ValidBOL(page));
  },
  illegibleBOL: async ({ page }, use) => {
    await use(new IllegibleBOL(page));
  },
  pendingValidationBOL: async ({ page }, use) => {
    await use(new PendingValidationBOL(page));
  },
  duplicatedBOL: async ({ page }, use) => {
    await use(new DuplicatedBOL(page));
  },
  extractionFailedBOL: async ({ page }, use) => {
    await use(new ExtractionFailedBOL(page));
  },
  generalDetails: async ({ page }, use) => {
    await use(new GeneralDetails(page));
  },
});
export { test, expect };
