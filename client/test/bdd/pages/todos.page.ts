class TodosPage {
  open() {
    browser.url("http://localhost:3000");
    browser.setTimeout({ pageLoad: 10000 });
  }

  getElementByClass(className: string) {
    return $(`.${className}`);
  }

  getTodoList(){
    return $$(".at-todo-item");
  }
}

export default new TodosPage();
