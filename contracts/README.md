# contracts

## How to start

Please create .env file copied from .env.example and input private keys and JSON-RPC URL

```env
```

```bash
$ npm install
# Build contracts
$ npm run build
# Run tests
$ npm run test
# Check account balance
% npm run balances
```

## Graph

### Setup Graph

```bash
$ git clone https://github.com/graphprotocol/graph-node.git
$ cd graph-node/docker
```

Change `ethereum` in docker-compose.yml

```yml
    environment:
      postgres_host: postgres
      postgres_user: graph-node
      postgres_pass: let-me-in
      postgres_db: graph-node
      ipfs: 'ipfs:5001'
      ethereum: 'mainnet:http://localhost:10001'
      GRAPH_LOG: info
```

### Install tool

```bash
$ npm install -g @graphprotocol/graph-cli
```

### Build Graph

```bash
$ cd graph/sample_token
$ npm i
$ npm run codegen
$ npm run deploy
$ npm run create
$ npm run deploy
```
