@clean-database
Feature: complete a todo

  Complete a todo

  Scenario: complete a todo
    Given I am in My Todos page
    And I add the Todo with name "todo 1" and description "description of todo 1"
    When I complete the todo with name "todo 1" and description "description of todo 1"
    Then the todo list has the following items:
      | name   | description           |
      | todo 1 | description of todo 1 |
    And the todo with name "todo 1" and description "description of todo 1" is disabled
