@webdriver
Feature: Search functionality

@webdriver
Scenario: Search for a query
Given I submit a search query 'test'
Then I should reach the search results page