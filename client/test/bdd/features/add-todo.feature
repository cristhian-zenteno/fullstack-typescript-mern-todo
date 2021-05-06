@clean-list
Feature: Add to-dos to the to-do list

  As a user, I need to add to-dos to my to-do list

  Scenario: Add a to-do to the list

    Given I am in My Todos page
    When I add a to-do with name "read javascript book" and description "read book for exam"
    Then the to-do list is as follows:
      | name                 | description        |
      | read javascript book | read book for exam |
