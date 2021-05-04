import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import TodosPage from "../pages/todos.page";
import expect from "expect";

Given("I am in My Todos page", async () => {
  TodosPage.open();
});

When("I add a Todo", async () => {
  const name = "todo 1";
  const description = "description of todo 1";
  const nameField = await TodosPage.getElementByClass("at-name");
  const descriptionField = await TodosPage.getElementByClass("at-description");
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
});

Then("the todo list has the following items:", async (table: DataTable) => {
  await browser.pause(1000);
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
