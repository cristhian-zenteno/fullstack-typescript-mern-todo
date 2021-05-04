@clean-database
Feature: Add to do

  Add to do to todo list

  Scenario: Add to do

    Given I am in My Todos page
    When I add the Todo with name "todo 1" and description "description of todo 1"
    Then the todo list is as follows:
      | name   | description           |
      | todo 1 | description of todo 1 |
