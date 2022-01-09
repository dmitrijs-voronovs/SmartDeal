# Multi-step payment tracking dapp &quot;Smart deal&quot;

## Problem

Multi-step business deals, agile projects, complex agreements have a common issue of payment tracking and fulfillment. Usually a 3rd party has to be involved to control if deliverables are completed and an agreed sum of money for each stage is paid in time.

## Solution

&quot;Smart deal&quot; is a convenient and reliable decentralized system that helps to define monetary agreement between a client and an agent. Moreover, It helps to prevent deals with unqualified agents by storing history of completed deals, reviews and ratings.

&quot;Smart deal&quot; solution includes a convenient web-based portal with authorized consultants that help to create an agreement and resolve all the issues.

## Installation

### Prerequisites

1. Ganache
2. truffle
3. yarn
4. Metamask extension (optional)

### Dapp launch (with ganache's web3 provider)

1. Launch ganache
2. Clone project and install dependencies (first time only):
   ```cmd
   git clone https://github.com/dmitrijs-voronovs/SmartDeal.git && cd SmartDeal && npm i && cd app && npm i && cd ..
   ```
3. Launch project: 
   ```cmd
   yarn launch
   ```

#### For generating new contract use command
```cmd
yarn migrate
```

### Dapp launch (with Metamask's web3 provider)

1. Launch ganache
2. Connect Metamask to ganache
   1. **New RPC URL**: http://localhost:7545
   2. **Chain ID**: 1337
   3. **Network Name**: SmartDeal
3. Clone project and install dependencies (first time only):
   ```cmd
   git clone https://github.com/dmitrijs-voronovs/SmartDeal.git && cd SmartDeal && npm i && cd app && npm i && cd ..
   ```
4. Launch project:
   ```cmd
   yarn launchM
   ```
5. Metamask extension will appear and ask to log in, use mnemonic from ganache for that

#### For generating new contract use command 
```cmd
yarn migrateM
```

### Important note

During the initial contract deployment, ganache’s 1st account is used for Authorized consultant role (creator), 2nd - for the Agent and 3rd - for the Client.\
Also the initial protection percent is set to 30%. To change it modify [this line](https://github.com/dmitrijs-voronovs/SmartDeal/blob/main/migrations/2_deploy_contracts.js#L10).

### Additinal commands

Running tests: `yarn test`\
Running migration: `yarn migrate`

## Diagrams

### Use case diagram

![smartDeals-Use case diagram drawio](https://user-images.githubusercontent.com/53301511/148654153-a0295a79-fa79-4aa3-8dae-4096677b7fd7.png)

### State diagram

![smartDeals-State diagram drawio](https://user-images.githubusercontent.com/53301511/148654157-1819718d-60cd-448a-bed9-75f6d0bfe11b.png)

### Sequence diagram

![SequenceDiagram](https://user-images.githubusercontent.com/53301511/148654161-b3216fa0-07ba-4c91-a0ac-1ed98ad772b9.png)

## Interface

![image](https://user-images.githubusercontent.com/53301511/148656962-6f4593bd-426f-4c55-8d5c-5d78ee92c1bf.png)
![image](https://user-images.githubusercontent.com/53301511/148657058-240a050e-42f7-4536-b46a-8670da245aa3.png)
![image](https://user-images.githubusercontent.com/53301511/148657074-4ed2dd2d-987c-4eb9-8ece-ca7cf61dc7a2.png)
