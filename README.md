# Investment Dashboard
A dashboard for investment analysis and portfolio management.

![demo](https://github.com/jkcswd/Investment-Dashboard-backend/blob/main/README/demo.gif) 

## Tech
- Mongoose/MongoDB
- Express.js
- React.js
- Node.js

## Overall System Design
- Financial securities data,economic data and user data stored in MongoDB database.
- Data initially populated using populateDb node program created specifically for this use case.
- Data filtered/paginated by date/other requirements on the server.
- REST API used to transmit data to client.
- Calculations done on data to produce composite data for tabular and graphical displays of data.
  - Daily and monthly calculations to be done on the backend server cron jobs.
  - On demand calculations done on frontend.

## Back-end
(INSERT DATABSE SCHEMA)

## Front-end
[Front-end repository](https://github.com/jkcswd/Investment-Dashboard-frontend)
