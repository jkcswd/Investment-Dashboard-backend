# Investment Dashboard
A dashboard for investment analysis and management.

## Tech
- SQLite
- Express.js
- React.js

## Overall System Design

- Financial securities and economic data stored in SQLite database within the server filesystem.
- Data initially populated using populateDb node program.
- Data filtered/paginated by date/other requirements on the server.
- REST API used to transmit data to client.
- Calculations done on data by the client to produce composite data or graphical displays of data.
- 

## Back-end

- Daily and monthly calculations to be done on the backend server.
  - Monthly: Relative strength of stocks.
  - Daily: Up/Down volume, advancers and decliners

## Front-end

- On demand calculations done on frontend