@clean-database
Feature: delete todo

  delete todo

  Scenario: delete todo
    Given I am in My Todos page
    And I add the Todo with name "todo 1" and description "description of todo 1"
    When I delete the todo:
      | name   | description           |
      | todo 1 | description of todo 1 |
    Then the todo list has not the following items:
      | name   | description           |
      | todo 1 | description of todo 1 |