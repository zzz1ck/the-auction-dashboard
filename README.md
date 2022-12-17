The Auction Dashboard
==================

[![Generic badge](https://img.shields.io/badge/node-16.12.0-green.svg)](https://nodejs.org/en/) [![Website https://the-auction-dashboard.herokuapp.com/](https://img.shields.io/website-up-down-green-red/https/the-auction-dashboard.herokuapp.com.svg)](https://the-auction-dashboard.herokuapp.com/) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/zzz1ck/web3-js-wallet-auth/blob/main/LICENSE) [![Donate](https://img.shields.io/badge/Donate-Crypto-green.svg)](https://web3.bio/zz1ck.near)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

Simple dashboard for the-auction.io $NEAR dApp.

## Installation

dApp requires [Node.js](https://nodejs.org/) v16.12+ to run and [Docker](https://www.docker.com/).

Install the dependencies and devDependencies and start the server.

```sh
cd the-auction-dashboard
yarn
```

## Development

Want to contribute? Great!

dApp uses Webpack & Docker for fast developing.
Make a change in your file and instantaneously see your updates!

### With Docker:
```sh
yarn docker:build
yarn docker:up
```
stop containers
```sh
yarn docker:down
```

### Without Docker:
```sh
cd web
yarn
yarn serve
```
in new Terminal window
```sh
cd web/client
yarn
yarn start
```
`client` will be available on **9000** port & `api` on **8000** port

## Building for source

For production release:

```sh
yarn docker:build
```
