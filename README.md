<<<<<<< HEAD
# React-Nodejs-Setup

This is a Project startup that uses React as a front-end library, and Node.js as backend

## Team Members

- Emad MOHAMED | Developer | <emo@corelia.ai>
- Mohamed Alaa | Developer |  <mhl@corelia.ai>

## Development

### Prerequisites

- Node.js v16.13.1
- MongoDB v5.0.8
- Yarn v1.22.15 or higher

### Configuration

Copy [example.dev.env](example.dev.env) to dev.env and adapt you variables if needed

Copy [client - example.env](client/example.env) to .env and adapt you variables if needed

### Run instructions

- Install server dependencies

```sh
cd server
yarn
```

- You need to load env variables for the server from dev.env

```sh
# For windows (use Gitbash)
set -a && source ../dev.env && set +a
# Or
export $(grep -v '^#' ../dev.env | xargs)

# For linux
source ../dev.env

```

- Run the server

```sh
yarn dev
```

- Install client dependencies

```sh
cd client
yarn
```

- You need to load env variables for the client from dev.env

```sh
# For windows (use Gitbash)
set -a && source ../dev.env && set +a
# Or
export $(grep -v '^#' ../dev.env | xargs)

# For linux
source ../dev.env

```

- Run the client

```sh
yarn dev
```

### Helpful tools

- Visual studio code (VS)
- Markdownlint VS extension
- ESLint VS extension

## Docker instructions

### For Server

- Copy [example.env](example.env) to .env and adapt you variables (See configuration section)

- Build image (Go to server directory)

```sh
cd server
make build
```

- Publish image (Go to server directory)

```sh
cd server
make publish
```

- Test it

```sh
docker-compose up -d
```

### For Client

- Copy [example.env](example.env) to .env and adapt you variables (See configuration section)

- Build image (Go to client directory)

```sh
cd client
make build
```

- Publish image (Go to client directory)

```sh
cd client
make publish
```

- Test it (if you didn't run this command before for the server)

```sh
docker-compose up -d
```
=======
# IMS_project
Its an internship management system 
>>>>>>> 052adfc4466376fa1980be5e9a0127b18616837b
