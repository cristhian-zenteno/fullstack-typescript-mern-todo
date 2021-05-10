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

When(
  "I delete the to-do with name {string} and description {string}",
  async function (name: string, description: string) {
    const todoList = await TodosPage.getAllTodos();
    const todo = todoList.find(async (todoItem) => {
      const itemName = (await todoItem.$(".at-todo-item-name")).getText();
      const itemDescription = (
        await todoItem.$(".at-todo-item-description")
      ).getText();
      return itemName === name && itemDescription === description;
    });
    const initialTodoLength = (await TodosPage.getAllTodos()).length;
    await (await todo.$(".at-todo-item-delete")).click();
    await browser.waitUntil(
      async () => (await TodosPage.getAllTodos()).length < initialTodoLength,
      { timeout: 2000 }
    );
  }
);

Then(
  /^the following items are( not)? on my to-do list:$/,
  async (not: string, table: DataTable) => {
    const todoList = await TodosPage.getAllTodos();
    let found: boolean = todoList.some(async (todoItem) => {
      const name = (await todoItem.$(".at-todo-item-name")).getText();
      const description = (
        await todoItem.$(".at-todo-item-description")
      ).getText();
      return table
        .rows()
        .some((item) => name === item[0] && description === item[1]);
    });
    found = not ? !found : found;
    expect(found).toBe(true);
  }
);

When(
  "I mark the to-do with name {string} and description {string} as completed",
  async (name: string, description: string) => {
    const todo = await TodosPage.getTodoItem(name, description);
    (await todo.$(".at-todo-item-done")).click();
  }
);

Then(
  "the to-do with name {string} and description {string} is disabled",
  async (name: string, description: string) => {
    // insert code here
    return "pending";
  }
);
