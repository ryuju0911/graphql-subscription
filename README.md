# graphql-subscription
This is a demonstration repository for GraphQL Subscriptions. It includes a simple client and GraphQL server to showcase how real-time communication works using subscriptions.

## Usage
There are community-maintained specifications for implementing GraphQL subscriptions using **WebSockets** and **Server-Sent Events (SSE)**.  
The `ws` directory contains the WebSocket implementation, while the `sse` directory contains the SSE implementation.

> ⚠️ The steps for running the SSE version are exactly the same as for WebSocket—just replace `ws` with `sse` in each step below.

To run the GraphQL server with **WebSockets**, follow these steps:

### 1. Run the server
```sh
cd ws/server
go run ./server.go
```

### 2. Install dependencies (in a separate terminal tab)
```sh
cd ws/client
pnpm install
```

### 3. Run the client
```sh
pnpm start
```

### 4. Open two browser tabs and navigate to [http://localhost:8081](http://localhost:8081)

### 5. Try it out
You can perform queries, mutations, and subscriptions by clicking the corresponding buttons in the UI.  
For example, open a subscription in one tab, then trigger queries or mutations in the other tab. The subscribing tab should display real-time logs reflecting those operations.
