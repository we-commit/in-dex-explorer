# Mono Repo for Trojan Finance.

An open source DEX explorer for Defi.

This repository consist of several scripts/workers/servers described in the following doc.

## How it works.

Todo:

# Running.

Generate the .env file with all the data necesary as indicated in .sample-env file.

If you want to run this in heroku, check the set-heroku scripts, save some time.

## 1. Requirements

- Nodejs 14+

### Restrictions !! 🐶

- For now it works only for ethereum main net. but with a couple of changes should even work for bsc and pancake.

### 1.1 **Services Keys.**

- Atlas: Create an atlas mongo db cluster and get the connection information needed in .env
- Heroku: Create the apps to point the set-heroku script.
- Web3 providers: Get an api keys from the requiered providers in .env.
- Get a lot of keys from infura an several providers, check .env-sample file

## 2. Check .sample-env and create .env file.

- Create a .env file and set your keys.

## 3. Runing init scripts

If runing over heroku you should use this. this will set all env to heroku apps based on your .env file.

```
"set-heroku": "ts-node ./src/utils/initServer/set-heroku.ts"
```

Create the mongodb tables and indexes as requiered. To ensure unique indexes and other props.

```
"ci": "ts-node ./src/utils/initServer/create-indexes.ts"
```

Import some known tokens from the public token lists. To get a tokens database with the most known tokens.

```
"it": "ts-node ./src/utils/initServer/init-tokens.ts"
```

Just a table to tag addreses and mark txs if the receiver or sender is a known address.

```
"ip": "ts-node ./src/utils/initServer/init-pools.ts",
```

All these steps are required, once ready let run the app backend services.

## 4. Start servers.

Start a pending mempool listener. used to get the new txs, filter by dex swap, and decode their input data as needed.

```
"lm": "ts-node-dev ./src/listener-mempool.ts",
```

Start a new block listener. To confirm pending and incoming txs.

```
"lc": "ts-node-dev ./src/listener-confirmation.ts",
```

Start some common but not less important tasks. As blocks information and clear cache tables.

```
"lcs": "ts-node-dev ./src/listener-commons.ts",
```

Start a ws api, connected to the mongo cluster oplog and uses socket.io rooms pattern to serve live data over a token in a dex.

Every time a tx its writen or modified in mongo, the oplog will inform that action and we can send updates to the websocket clients subscribed to a room.

It also expose the client_build app to the public.

```
"web": "ts-node-dev ./src/\_websocket-server.ts"
```

## 6- Start Front end app.

Go to the client folder and run the build script.

- yarn install && yarn **start:c**

- after first start you can just run yarn **start**

## 7- Build server and client.

Just run the build script in the root folder

```
yarn install && yarn build
#"build": "cd client && yarn build && cd .. && tsc",
# client build script:
#    "build": "rm -rf ../client_build && yarn && yarn compile-contract-types && react-scripts build && mv build ../#client_build",
```

This will go to the client folder,remove old client_build, install deps for client, compile contract types, react-script build and move it to the root dir.
Allowing the express server to serve the client.
