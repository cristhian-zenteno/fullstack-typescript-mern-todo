@clean-list
Feature: Delete to-dos from my list

  As a user, I need to delete to-dos from my to-do list

  Scenario: delete a todo
    Given I am in My Todos page
    And I add a to-do with name "read javascript book" and description "read book for exam"
    When I delete the to-do with name "read javascript book" and description "read book for exam"
    Then the following items are not on my to-do list:
      | name                 | description        |
      | read javascript book | read book for exam |
