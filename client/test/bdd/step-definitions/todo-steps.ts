import { Given } from "@cucumber/cucumber";
import TodosPage from "../pages/todos.page";

Given("I am in My Todos page", async () => {
  TodosPage.open();
});
