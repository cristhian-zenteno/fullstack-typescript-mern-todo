import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import TodosPage from "../pages/todos.page";
import expect from "expect";

Given("I am in My Todos page", async () => {
  TodosPage.open();
});

When(
  "I add a to-do with name {string} and description {string}",
  async (name: string, description: string) => {
    await (await TodosPage.nameField).setValue(name);
    await (await TodosPage.descriptionField).setValue(description);
    const initialTodoLength = (await TodosPage.getAllTodos()).length;
    await (await TodosPage.addTodoButton).click();
    await browser.waitUntil(
      async () => (await TodosPage.getAllTodos()).length > initialTodoLength,
      { timeout: 2000 }
    );
  }
);

Then("the to-do list is as follows:", async (table: DataTable) => {
  const todoList = await TodosPage.getAllTodos();
  expect(todoList.length).toBe(table.rows().length);
  if (todoList.length === table.rows().length) {
    todoList.forEach(async (todoItem, i) => {
      const expectedElement = table.rows()[i];
      const name = await todoItem.$(".at-todo-item-name");
      const description = await todoItem.$(".at-todo-item-description");
      expect(name.getText()).toBe(expectedElement[0]);
      expect(description.getText()).toBe(expectedElement[1]);
    });
  }
});
