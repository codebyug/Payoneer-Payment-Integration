# Payoneer Payment API Integration
Integration of payoneer payment API using NodeJs

This is a Node JS application

run 
- `npm i` to install required dependencies
- `npm start` to start the server

if the server is started on port 8181, use http://localhost:8181/docs/ to see the available endpoints.

Third party endpoints are configured in config.js and can be changed accordingly in .env file.

There 2 endpoints
- GET /payout/{clientRefId} look up payment payout info
- POST /payout Initiate a payout request
