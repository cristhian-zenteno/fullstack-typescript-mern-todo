Feature: Add to do

  Add to do to todo list

  Scenario: Add to do

    Given I am in My Todos page
    When I add a Todo
    Then the todo list has the following items:
      | name   | description           |
      | todo 1 | description of todo 1 |
