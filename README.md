DishCrown
=========

Redefining Restaurant Reviews

Founder:
Jeffrey Yan

Authors:
Collin Stedman
Angela Zhou

RESTAURANT DB REPRESENTATION
  ID
  NAME
  IMAGE
  RAWSCORE
  REVIEWCOUNT
  PRICEPOINT
  CONTACT
    NUMBER
    ADDRESS
    WEBSITE
  MENU
    ARRAY OF
      DISH
        ID
        Name
        Type
        Price
        Overall
        Taste
        Presentation
        Value
        Reviewcount

USER DB REPRESENTATION
  ID
  USERNAME
  PASSWORD
  SCORE
  REVIEWS
    ARRAY OF
      REVIEW
        DISH ID
        REVIEW PARTS
    ARRAY OF
      REVIEW
        RESTAURANT ID
        REVIEW PARTS

REVIEW DB REPRESENTATION
  ID
  TYPE
  CONTENTS
  USERNAME

IMMEDIATE NOTES:
  Can we consolidate jquery version?
  Can we put jquery in assets?
  Utils folder, for js functions?

DA LIST:

Server Side:

Users
  1. Levels
  2. Points
  3. Login
    a. HTTPS?
Restaurants
  1. Menus
    a. Items
      i. Comments
      ii. Ratings
FB Integration

Pull data from Yelp?


frontend: 
1) landing page: 
    enter restaurant name
    also, display some of the top dishes 'today'
2) view a restaurant's menu
    displays a picture of the restaurant & a blurb with information about it
    displays the menu and its items in a table, with the ratings 
    2b) after you click on a menu item
        tab expands downward, or item opens in lightbox, with reviews, ratings, picture

3) browse restaurants: 
    by type, $$$, rating
    display each with a few of the top dishes


- additional pages not required for MVP ? - 
'profile page'
