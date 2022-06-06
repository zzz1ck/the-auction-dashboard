# the-auction-dashboard
https://the-auction-dashboard.herokuapp.com/ - Simple dashboard for the-auction.io $NEAR dapp

For local development u may use docker & just shoot `yarn docker:build; yarn docker:up`

U may work without docker, then shoot `yarn; yarn serve;` inside the `web` folder & in new terminal window, inside the `web/client` folder - `yarn; yarn start;` then client will be available on `9000` port & api on `8000` port

Docker aliases:
  - `yarn docker:build` will build `the-auction-dashboard` docker image;
  - `yarn docker:up` will run docker-compose entities
  - `yarn docker:down` will stop docker-compose entities
