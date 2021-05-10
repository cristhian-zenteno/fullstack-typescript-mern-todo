@clean-list
Feature: Complete a to-do

  As a user, I need to register when I have completed a to-do on my list

  Scenario: complete a to-do of my list
    Given I am in My Todos page
    And I add a to-do with name "read javascript book" and description "read book for exam"
    When I mark the to-do with name "read javascript book" and description "read book for exam" as completed
    Then the following items are on my to-do list:
      | name                 | description        |
      | read javascript book | read book for exam |
    And the to-do with name "read javascript book" and description "read book for exam" is disabled
