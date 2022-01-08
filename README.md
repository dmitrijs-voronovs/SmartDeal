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

### Dapp launch

1. Launch ganache
2. `git pull https://github.com/dmitrijs-voronovs/SmartDeal.git && cd SmartDeal && yarn launch`

### Important note

During the initial contract deployment, ganache’s 1st account is used for Authorized consultant role (creator), 2nd for Agent and 3rd for Client. 

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

