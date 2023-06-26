# Read to Win Publications

##### A straightforward web API developed using Node.js with Express specifically for the Read to Win Publications automated system.

## Getting started

### clone the project

- clone the project into your local machine
- `git checkout staging`
- `npm install`

### Setting up database connection

Create a `.env` file with the following content:

```
# environment variables
NODE_ENV=dev
PORT=8000

# database configurations
PG_USER= <USER_NAME>
PG_PASSWORD= <USER_PASSWORD>
PG_HOST= <DATABASE_HOST>
PG_DATABASE= <DATABASE_NAME>
PG_MAXCONN=150

# jwt signing token
JWT_SECRET= <RANDOM_SECURE_KEY>
```

### starting the server

- `npm run dev`

## Notes

- ##### The `staging` branch uses raw SQL queries for database calls
- ##### The `orm-used` branch uses Sequelize ORM for database calls
  -- `git checkout orm-used`
  -- `npm install`  
  -- `npm run dev`
