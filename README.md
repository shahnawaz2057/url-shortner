# URL Shortener

Backend REST API for url shortener.

## Local DB Installation

First open the .env file and update the db connection params with your local db connection details.

Then, you will need to run db:migrate to create the required tables.

```bash
npx sequelize-cli db:migrate
```

Once completed, Validate in the DB, if the user & url table created successfully.

Ensure that the migrations filename was also inserted in the SequelizeMeta table.

Then,w user seed command, to create some sample user.

```bash
npx sequelize-cli db:seed:all
```

Verify in the user table, users is successfully created.

Lastly, run

```bash
npm run start
```
