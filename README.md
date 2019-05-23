# Anime list WEB

## Description
- [✔] Web system is made to serve users - find the anime, manga, person, or character they are looking for, and also if a user has an account, they can add anime or manga to their personal watch list.

## Entity definition
- [✔] Manipulated object - User
- [✔] User
- [✔] Entity has 3 mandatory attributes:
    - [✔] id - string, unique - Auto Add
    - [✔] emails - array 
    - [✔] emails.$.address - string, required
    - [✔] emails.$.verified - boolean 
    - [✔] services - object, blackbox object - the password and access keys are stored there
- [✔] Entity should have at least 5 custom attributes
    - [✔] name - string, required
    - [✔] list - array
    - [✔] list.$ - object, blackbox object, stores all the data of an item received from the api


## API definition
- [✔] API should have at least 4 methods
    - [✔] GET /search/:genre/?q=query&page=page - Gets all the items by filtering with the genre, query and page
        - 200 - Returns all the items with the provided genre, query and page
        - 404 - No items found
        - 5xx - Internal server errors
    - [✔] GET Meteor.userId() - Gets the current logged in user's id
        - 200 - Returns the id or null
        - 4xx - internal server/user side error
        - 5xx - Internal server errors
    - [✔] POST Meteor.call('addToList', item) - Posts new item into the current user's watch list
        - 201 - New item added to the list
        - 4xx - internal server/user side error
        - 5xx - Internal server error
    - [✔] POST Accounts.createUser(user) - Adds a new user to database
        - 201 - New user added to database
        - 4xx - internal server/user side error
        - 5xx - Internal server error
    - [✔] DELETE Meteor.call('removeItem', id) - Deletes the item that has the same id from the list of the current user.
        - 204 - Item has been deleted
        - 4xx - internal server/user side error
        - 5xx - Internal server error

## UI definition
The system's main functionality (in the Main view) works as one page app, where you can search for you favourite anime, manga, person or character and add anime or manga items to user's personal list.
In second view (Login view) users can login with their provided credentials.
In third view (Register view) users can register to the system.
In the fourth view (List view) a user can check his private list of items he added, remove them.
