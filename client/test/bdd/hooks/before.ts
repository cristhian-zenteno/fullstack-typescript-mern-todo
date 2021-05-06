import { Before } from "@cucumber/cucumber";
import { dropDataBase } from "../helpers/database";

Before({ tags: "@clean-list" }, async () => {
  await dropDataBase();
});
