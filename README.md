# A simple node js app with express js
### Description
This is a simple user managment (**Sign In, Sign Up, Update and Delete**) System. This example consists on the managment of an User. Please help with a coffee.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AFSV8TQBVW6LC)

## Instruction
Remember to make **npm i or npm install** in the root of the app to install the **modules**.

## Structure
* src -> Contains our app.
    * app.js -> server of the app.
    * public -> static files (CSS, JS, IMGS).
    * config -> Configurations of the app.
        * database -> Database processes.
            * dbConnection.js -> Connection to the DB.
            * queries -> Contains the queries.js for the user.
            * dao -> Managment of the database processes.
    * app -> Contains the routes and views.
        * routes
            * index.js
            * profiles.js
            * user.js
        * views
            * index.html
            * profiles.html
            * user.html

### Dependencies of this project:
```JSON
"dependencies": {
    "bcrypt": "^2.0.1",
    "body-parser": "^1.18.2",
    "connect-flash": "^0.1.1",
    "cookie-parser": "^1.4.3",
    "express": "^4.16.3",
    "express-session": "^1.15.6",
    "express-validator": "^5.2.0",
    "hbs": "^4.0.1",
    "mysql": "^2.15.0",
    "passport": "^0.4.0",
    "passport-local": "^1.0.0"
  }
}
```

#### Demonstration
![Login Session](/login.png)
Login session

![Register Session](/register.png)
Register session

![Profile Session](/profile.png)
Profile session

![Update Session](/update.png)
Update session