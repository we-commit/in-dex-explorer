# Mono Repo for Trojan Finance.

A **_simple_** yet **_powerfull_** open source **transaction explorer** for **Uniswap** and **Sushiswap**.

- https://app.trojan.finance/#/explorer
  <br></br>
  <img  style="margin-left:10rem" src="./_assets/1.gif">

# Main Features.

## **Live Mempool**.

It includes mempool (pendingTxs) transactions so you can be aware of incoming movements, **that for example**, may impact in a token price.

We take the mempool **input data** for every **new pending transaction**, we decode it to get the target DEX router (univ2 univ3 sushiswap), the tokens and pools involved in the swap, the swap route, the swap method, the swap **inputs** and **outputs** amounts. With this data we classify txs and store them in a backend **database** connected to websocket server that monitor and publish every new pending transaction and their **failed/confirmed/dropped/replaced** changes.

## **Real Time Updates**

The interface run with real time updates, so you can...

### For example .

If a token its being traded like really fast (HOT), or if a token its not beign traded at all.
This give the user a better idea of **what its really happening in the network**.

Look at the difference between the following tokens (for example) and get your own idea.

- An always **HOT** token (really fast updates), all TXs involving WETH: https://app.trojan.finance/#/explorer?inputCurrency=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2

- A not so **HOT** token (not so fast updates) , all TXs involving DAI: https://app.trojan.finance/#/explorer?inputCurrency=0x6B175474E89094C44Da98b954EedeAC495271d0F

- A not so **HOT** token (not so fast updates) , all TXs involving USDC: https://app.trojan.finance/#/explorer?inputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48

- A **NOT_HOT** token, TXs involving LINK: https://app.trojan.finance/#/explorer?inputCurrency=0x514910771AF9Ca656af840dff83E8264EcF986CA

### Examples.

Among other use cases, you can get advantage of real time swaps information to.

- Jump in a new TOKEN recently added to uniswap or sushiswap.

- Know the real status of a token of your interest and wake up (take action) if the token become HOT from one moment to another.

- Check whales movements and realize how much they are trading or how much token balances they got available to DROP/PUMP a token.

- Check users trading at the same time from different wallets, connect them and think about what they are doing.

- ### **Among a lot of other scenarios, its on the user (you) to discover and decide how to use Trojan Finance.**

## **Token / ETH Prices**

The interface uses the **Uniswap SDK** to get the prices of all tokens listed in the explorer.

## **Block Information**

We query **gas now** and **blocknative API** to get latest and next block information.

## **Token / Transaction Links**

The interface generate a couple of usefull links for the selected token and the showed transactions, so you can easily see the transaction details in etherscan and validate it.

## **Known Address in TX Tags**

The interface shows a TAG in the transaction header of the explorer, in case a known whale address is involved in the transaction.
We use sibil list to import some public / verified users from https://raw.githubusercontent.com/Uniswap/sybil-list/master/verified.json.

_We are looking for a way to import more whales addresses from other sources._

# Running.

Clone the reposity and install dependencies.

    git clone https://github.com/we-commit/in-dex-explorer.git

# Requirements

## **Node**

Use nodejs v14.16.1+ and run with yarn.

- Nodejs v14.16.1+: Recomend https://github.com/nvm-sh/nvm
- Yarn: https://classic.yarnpkg.com/en/docs/install

## **MongoDB**

Create an account, follow the instructions and create a free database using a shared cluster.

Wait a few minutes so the databaseis available.

Create a user and get the connection information to later set the ATLAS_STRING .env variable and connect to the database.

- MongoDB Cluster: https://www.mongodb.com/cloud/atlas/register

## **Api Providers**

Get at least 1 key from each provider.

- https://www.pokt.network/
- https://dashboard.alchemyapi.io/
- https://infura.io/
- https://etherscan.io/myapikey/
- https://getblock.io/en/
- https://www.blocknative.com/

# Check .sample-env and create .env file.

- We got TWO .env Files to create.

## ./.env In the root folder.

```
# serverUser pass _ID1_ _DB_NAME_ _ID2_
ATLAS_STRING=mongodb://serverUser:pass@cluster0-shard-00-00._ID1_.mongodb.net:27017,cluster0-shard-00-01._ID1_.mongodb.net:27017,cluster0-shard-00-02._ID1_.mongodb.net:27017/_DB_NAME_?ssl=true&replicaSet=atlas-_ID2_-shard-0&authSource=admin&retryWrites=true&w=majority

# must be the same that replaced _DB_NAME_
DB_NAME=TROJAN-DB-ETH

# a collection prefix when tables are created.
COLLECTION_PREFIX=_ETH_

# ws CORS url
CORS_ORIGIN=*

GAS_STATION_API_URL=https://ethgasstation.info/api/ethgasAPI.json?
BLOCKNATIVE_API_URL=https://api.blocknative.com/gasprices/blockprices

# Get a key in blocknative.
BLOCKNATIVE_API_KEY=9999999999999999999999999999999999999999999999999999

# this is the main websocket provider FULL URL, used to listen to the events of the network.
MAIN_WS=wss://mainnet.infura.io/ws/v3/99999999999999

# a list of several providers key used to get transaction data, tokens, pools, etc.
# as we run listener in separated server origins (MEMPOOL LISTENER, BLOCK LISTENER AND CONFIRMATION LISTENER)
# we use 4 infura free keys from different accounts, to avoid rate and daily call limits.

INFURA_KEY1=9999999999999999999999999999999999999999999999999999
INFURA_KEY2=9999999999999999999999999999999999999999999999999999
INFURA_KEY3=9999999999999999999999999999999999999999999999999999
INFURA_KEY4=9999999999999999999999999999999999999999999999999999
#same for alchemy (MEMPOOL LISTENER, AND CONFIRMATION LISTENER)
ALCHEMY_KEY1=9999999999999999999999999999999999999999999999999999
ALCHEMY_KEY2=9999999999999999999999999999999999999999999999999999
#same for etherscan (MEMPOOL LISTENER, AND CONFIRMATION LISTENER)
ETHERSCAN_KEY1=9999999999999999999999999999999999999999999999999999
ETHERSCAN_KEY2=9999999999999999999999999999999999999999999999999999
#just 1 key for this 2 providers, as we use them as last/backup resource in case others providers are not available.
POKT_KEY=9999999999999999999999999999999999999999999999999999
GET_BLOCK_KEY=9999999999999999999999999999999999999999999999999999

# !!! IMPORTANT !!! DEX router address, used to check if a new transaction is a DEX transaction.
UNIV2=0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
UNIV3=0xE592427A0AEce92De3Edee1F18E0157C05861564
SUSHIV2=0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F

# used just to import tokens from the network, and init the database with a token information Cache,
# this saves a lot of calls to the network as we need token data like **decimals** to decode and parse swaps amounts correctly.

WRAPPED=https://wrapped.tokensoft.eth.link/
YEARN=https://yearn.science/static/tokenlist.json
ROLL=https://app.tryroll.com/tokens.json
SUSHISWAP=https://raw.githubusercontent.com/sushiswapclassic/token-list/master/sushiswap.tokenlist.json
ONE_INCH=https://tokens.1inch.eth.link
COINGECKO=https://tokens.coingecko.com/uniswap/all.json
COMPOUND=https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json
DEFIPRIME=https://defiprime.com/defiprime.tokenlist.json
MESSARI=https://messari.io/tokenlist/messari-verified
OPYN=https://raw.githubusercontent.com/opynfinance/opyn-tokenlist/master/opyn-v1.tokenlist.json
SNX=https://synths.snx.eth.link/
SET=https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json
AVE=https://tokenlist.aave.eth.link
AGORA=https://datafi.theagora.eth.link
CMCDEFI=https://defi.cmc.eth.link
CMCSTABLECOIN=https://stablecoin.cmc.eth.link
CMC200ERC20=https://erc20.cmc.eth.link
KLEROS=https://t2crtokens.eth.link
FURUCOMBO=https://cdn.furucombo.app/furucombo.tokenlist.json
KYBER=https://api.kyber.network/tokenlist
MYCRYPTOAPI=https://uniswap.mycryptoapi.com/
ZAPPER=https://zapper.fi/api/token-list
UMA=https://umaproject.org/uma.tokenlist.json
BAZAR=https://raw.githubusercontent.com/EthereansOS/Organizations-Interface/master/bazar-tokens-list/dist/decentralizedFlexibleOrganizations.json
ZERION=https://tokenlist.zerion.eth.link

# used only locally to init heroku apps and set environment variables automatically.
#HEROKU_APP_NAME=in-dex-explorer-*

# used to build the front on heroku, this env vars are used in set-heroku script
# at the moment heroku build the client.
# infura key, google analitycs ID, and the heroku app url where the websocket server will be exposed
REACT_APP_CHAIN_ID=1
REACT_APP_GOOGLE_ANALYTICS_ID=UA-999999999999999-1
REACT_APP_NETWORK_URL=https://mainnet.infura.io/v3/999999999999999
REACT_APP_WS_URL_TROJAN=https://localhost:3001/ # or https://mysuperwebsocket.herokuapp.com/ # ensure it ends on /
REACT_APP_APP_IS_OFFLINE=false
SKIP_PREFLIGHT_CHECK=true
```

## ./client/.env In the client folder

```
REACT_APP_CHAIN_ID=1
REACT_APP_GOOGLE_ANALYTICS_ID=UA-999999999999999-1
REACT_APP_NETWORK_URL=https://mainnet.infura.io/v3/999999999999999
REACT_APP_WS_URL_TROJAN=http://localhost:3001/
REACT_APP_APP_IS_OFFLINE=false
SKIP_PREFLIGHT_CHECK=true
```

# Runing init scripts.

- In the root folder:

      yarn install

- Go to the client folder:

      cd client
      yarn install

- In the root folder again. Connect to mongodb, create DB, create collections and indexes as required.

  ```
  yarn ci

  "ci": "ts-node ./src/utils/initServer/create-indexes.ts"
  ```

- Import some known tokens and pools. To get a database with the initial data.

  ```
  yarn it && yarn ip

  "it": "ts-node ./src/utils/initServer/init-tokens.ts"
  "ip": "ts-node ./src/utils/initServer/init-pools.ts"
  ```

- Import known addres, to get a sample data base to tag transactions with a known user tag.

  ```
  yarn iw

  "iw": "ts-node ./src/utils/initServer/init-whales.ts",
  ```

  `All these steps are required to start the app. This can take some time, specially on tokens and pools, for pools we scan factories from creation block up to the latest, so pretty much lot of blocks, but if you need a fast way to get and validate pools addresses and information this is really usefull. And same for token decimals and data.`

# Start Backend Services.

Having the ./.env file created, go to the repo root folder and run:

- Block Listener:

Start some common but not less important tasks. As blocks information and clear cache tables. Start and wait to get a couple of blocks information.

```
yarn lcs # "lcs": "ts-node-dev ./src/listener-commons.ts",
```

- Mempool Listener:

Start a pending mempool listener. Used to get the new txs, filter by dex swap, and decode their input data as needed.
This is like the most expensive task, as it must get all the network incoming transactions hashes, get the transactionResponse (details), and classify it.

```
yarn lm # "lm": "ts-node-dev ./src/listener-mempool.ts",
```

- Confirmation Listener.

Start an event listener, filtering by router address and swap event topic. Getting for each confirmed block, all the confirmation events and transaction related, updating the pending transaction status as correpond.

```
yarn lc # "lc": "ts-node-dev ./src/listener-confirmation.ts",
```

- Start **Websocket** and **App Client** server.

Connected to the mongo cluster oplog and uses socket.io rooms pattern to serve live data over a token in a dex.
Every time a tx its writen or modified in mongo, the oplog will inform that action so we can send updates to the websocket clients subscribed to a token room.

It also expose the client_build app to the public.

```
yarn web # "web": "ts-node-dev ./src/\_websocket-server.ts"
```

# Start Front end App.

Having the ./client/.env file created, go to the client folder and run:

```
yarn install && yarn start:c
```

- After first time start you can just run yarn start, start:c its just used to compile some contract types.

```
yarn start
```

- At this point you have the app runing over **http://localhost:3000** in development mode, with react scripts.

# Build Server & Client App

With .env setted on heroku or in your server.

Just run the build script in the root folder, it will remove old build folders, install deps for client app, build the app and move it to the root folder to be available for the server and expose the ./client_build app in express.

```
    yarn install && yarn build
```

Check the internal build scripts:

```
    # ./package.json build script:

    #"build": "cd client && yarn build && cd .. && tsc",

    # ./client/package.json build script

    # "build": "rm -rf ../client_build && yarn && yarn compile-contract-types && react-scripts build && mv build ../#client_build",

```

This will go to the client folder,remove old client_build, install deps for client, compile contract types, react-script build and move it to the root dir.
Allowing the express server to serve the client.

- Finally start the app runing the build server and client projects.

```
    yarn web-worker
    yarn worker-a
    yarn worker-b
    yarn worker-c
```

Check the scripts, used to test locally and check if the builds are correct.

```
    "web-worker": "node ./dist/_websocket-server.js",
    "worker-a": " node ./dist/listener-commons.js",
    "worker-b": "node ./dist/listener-mempool.js",
    "worker-c": "node ./dist/listener-confirmation.js"
```

Check the Procfile for heroku workers.

```
web: node ./dist/_websocket-server.js
worker-a: node ./dist/listener-commons.js
worker-b: node ./dist/listener-mempool.js
worker-c: node ./dist/listener-confirmation.js

```

# Restrictions !! 🐶

For now it works only for _Ethereum_ _Main_ _Net_.

```
Cheers! 🐶
```
