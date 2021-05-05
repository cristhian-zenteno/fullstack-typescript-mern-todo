class TodosPage {
  open() {
    browser.url("http://localhost:3000");
    browser.setTimeout({ pageLoad: 10000 });
  }

  getElementByClass(className: string) {
    return $(`.${className}`);
  }

  getTodoList() {
    return $$(".at-todo-item");
  }

  async getTodoItem(name: string, description: string) {
    const todoList = await this.getTodoList();
    return todoList.find(async (todoItem) => {
      const todoName = (await todoItem.$(".at-todo-item-name")).getText();
      const todoDescription = (
        await todoItem.$(".at-todo-item-description")
      ).getText();
      return todoName === name && todoDescription === description;
    });
  }
}

export default new TodosPage();
