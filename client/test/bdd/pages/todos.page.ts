class TodosPage {
  open() {
    return browser.url("http://localhost:3000");
  }
}

export default new TodosPage();
