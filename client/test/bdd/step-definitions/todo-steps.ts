import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import TodosPage from "../pages/todos.page";
import expect from "expect";

Given("I am in My Todos page", async () => {
  TodosPage.open();
});

When(
  "I add the Todo with name {string} and description {string}",
  async (name: string, description: string) => {
    const nameField = await TodosPage.getElementByClass("at-name");
    const descriptionField = await TodosPage.getElementByClass(
      "at-description"
    );
    const addButton = await TodosPage.getElementByClass("at-add-todo-button");
    await nameField.setValue(name);
    await descriptionField.setValue(description);
    await addButton.click();
    const todolist = await TodosPage.getTodoList();
    browser.waitUntil(
      () =>
        todolist.find(
          (item) =>
            item.$("at-todo-item-name").getText() === name &&
            item.$("at-todo-item-description").getText() === description
        ),
      {
        timeout: 5000,
        timeoutMsg: "todo item to be appears after 5s",
      }
    );
    await browser.pause(1000);
  }
);

Then("the todo list is as follows:", async (table: DataTable) => {
  const todoList = await TodosPage.getTodoList();
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

Then(
  /^the todo list has( not)? the following items:$/,
  async (not: string, table: DataTable) => {
    const todoList = await TodosPage.getTodoList();
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

When("I delete the todo:", async (table: DataTable) => {
  const todoList = await TodosPage.getTodoList();
  const todo = todoList.find(async (todoItem) => {
    const name = (await todoItem.$(".at-todo-item-name")).getText();
    const description = await todoItem.$(".at-todo-item-description").getText();
    return table
      .rows()
      .some((item) => name === item[0] && description === item[1]);
  });
  expect(todo).toBeDefined();
  await (await todo.$(".at-todo-item-delete")).click();
  await browser.pause(1000);
});
