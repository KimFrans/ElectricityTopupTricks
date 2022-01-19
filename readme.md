# ElectricityTopupTricks

Create a web app, to help your local Municipality to track electricity usage per household. Each month the Municipality gives each household 50 units each for free. Households can topup if they need extra electricity.

The factory function is missing some methods and queries. Please sort that out.

Ensure to deploy you application to Travis ans Heroku.

As you use appliances, your units will drop accordingly.

The factory function in `electricity-meters.js` have the following methods. You need to implement them.

Function name            | Description
------------------------ | ---------------
`streets`        |   List all the streets that we have records
`streetMeters`       |  for a given street show all the meters and their balances (use where clause)
`appliances`             |  List all appliances and their rates
`topupElectricity`       |  buy electricity for a given `meterId` and `units` (use upate with where)
`meterData`      |  For a given meterId, list all the data for it 
`useElectricity`   |  allow a house to use electricity - use `meterId` and `units`
`totalStreetBalance` | returns the total balance for each street - this is the totally electricity available to use in the whole street.

## Database setup

Create a database called `topups_db` in postgresql. Set it up so that your application can use it.

Please use the `sql/db.sql` script to create your tables and to insert data into your database.

**NOTE:** - We have already created tables and data for you. You don't need to create any other tables.

## Screens to create

Route name |Route type| Route description |
-----|--|---------|
`/streets` | GET | Show a list of all the streets. This screen should be working if all your initial database setup is completed|
`/appliances` | GET | Show all the appliances and their respective electricity usage rates.
`/meter/:street_id` | GET | Show a list of all the meters in a given street.|
`/meter/use/:meter_id`| GET & POST | Create a screen where households can use electricity. Using electricity should decrease the balance in the table for the appropriate table. The users can select the appliance type for which electricity is used from a dropdown.
`/street/usage`| GET | Create a screen that shows the total electricity balances available for each of the streets. 
`/meter/use/:meter_id`| GET & POST | Create a screen where households can buy electricity. Buying electricity should increase the balance in the table for the appropriate table.

The routes that meets the `meter_id` can be linked to from the `/meter/:street_id` screen.

## Unit Testing

Fix the failing unit tests in the `/test/electricity-meters.test.js` file.

If your initial setup is done correctly you should have one passing unit test

Run the tests using `npm test`.

## Deployment

Create Travis deploy and add a Travis badge to your readme file.
Deploy your application to Heroku.

## Finally

Once done send your GitHub repo & deployment link to `menters@projectcodex.co`.