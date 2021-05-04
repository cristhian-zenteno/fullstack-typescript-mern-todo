import { Before } from "@cucumber/cucumber";
import { dropDataBase } from "../helpers/database";

Before({ tags: "@clean-database" }, async () => {
  await dropDataBase();
});
