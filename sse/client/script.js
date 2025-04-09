import { createClient } from "graphql-sse";

const client = createClient({
  // singleConnection: true,
  url: "http://localhost:8080/query",
});

const outputDiv = document.getElementById("output");

function displayOutput(message) {
  const p = document.createElement("p");
  p.textContent = message;
  outputDiv.appendChild(p);
}

// Query
const queryButton = document.getElementById("queryButton");
queryButton.addEventListener("click", () => {
  const query = `
    query {
      messages {
        id
        user
        createdAt
        text
      }
    }
  `;

  client.subscribe(
    {
      query: query,
    },
    {
      next: (data) => {
        displayOutput(`Query Result: ${JSON.stringify(data.data)}`);
      },
      error: (error) => {
        displayOutput(`Query Error: ${error}`);
      },
      complete: () => {
        displayOutput("Query Completed");
      },
    }
  );
});

// Mutation
const mutationButton = document.getElementById("mutationButton");
mutationButton.addEventListener("click", () => {
  const mutation = `
    mutation PostMessage($user: String!, $text: String!) {
      postMessage(user: $user, text: $text) {
        id
        user
        createdAt
        text
      }
    }
  `;

  client.subscribe(
    {
      query: mutation,
      variables: { user: "ClientUser", text: "Hello from the client!" },
    },
    {
      next: (data) => {
        displayOutput(`Mutation Result: ${JSON.stringify(data.data)}`);
      },
      error: (error) => {
        displayOutput(`Mutation Error: ${error}`);
      },
      complete: () => {
        displayOutput("Mutation Completed");
      },
    }
  );
});

// Subscription
const subscriptionButton = document.getElementById("subscriptionButton");
subscriptionButton.addEventListener("click", () => {
  const subscription = `
    subscription MessagePosted($user: String!) {
      messagePosted(user: $user) {
        id
        user
        createdAt
        text
      }
    }
  `;

  client.subscribe(
    {
      query: subscription,
      variables: { user: "ClientUser" },
    },
    {
      next: (data) => {
        displayOutput(`Subscription Update: ${JSON.stringify(data.data)}`);
      },
      error: (error) => {
        displayOutput(`Subscription Error: ${error}`);
      },
      complete: () => {
        displayOutput("Subscription Completed");
      },
    }
  );
});
