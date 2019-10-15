# ArangoDB GraphQL Spring Boot Starter Demo

## Introduction 

The code in this repository is intended to provide a runnable demo for the Arango GraphQL Spring Boot Starter.

The demo implements a fictional retail bank "AvoBank". The intention here is to have an easily understandable use case that demonstrates the 
benefits of the ArangoDB GraphQL Spring Boot Starter and associated libraries.

## Pre-requisites

In order to run this demo you will require Docker on your machine. Setting this up is beyond the scope of this README - please see http://docs.docker.com/get-started for more infomation.

The demo uses docker-compose with a compose file format 3.7 file, which requires Docker 18.06.0+.

## Running the Demo

To run the demo, simply clone this repository and run

`docker-compose up`

This will run the following items

| Service | Description |
| ------- | ----------- |
| rest-service | An implementation of the AvoBank backend using a RESTful architecture style using Spring. |
| graphql-service | An implementation of the AvoBank backend using vanilla GraphQL with GraphQL Java Tools. |
| arango-graphql-service | An implementation of the AvoBank backend using ArangoDB GraphQL Spring Boot Starter |
| demo-ui | A simulator application that demonstrates the AvoBank Mobile App interacting with the various backend implementations |
| ArangoDB | An instance of ArangoDB that is used as the backend database platform for the above backend service implementations |

## What is in the demo?

The demo contains 3 different types of backend to illustrate the relationship between a traditional REST implementation, a vanilla GraphQL implemetntation and an implementation using GraphQL and ArangoDB with the ArangoDB Spring Boot Starter.

The demo will also set up two fictional customers, Rick and Claire. Rick has only one account with AvoBank but Claire has 15.

To understand the key differences between GraphQL and REST approached I recommend taking a look at this article which provides a detailed description of the differences: http://howtographql.com/basics/1-graphql-is-the-better-rest.

To start having a play around with the demo - you can access the Demo UI on http://localhost

Other useful links are:

- ArangoDB Instance: http://localhost:9529
- Voyager UI for GraphQL Model: http://localhost:9191/voyager 
- Altair UI for GraphQL Interface: http://localhost:9191/altair

### REST Backend

We can illustrate these differences by accessing the demo application.

- Select the "Clients" tab and select "Rick" 
- Select the "REST" tab and click the "REST" button.

You will see that in order to populate this small screen with not a great deal of information we have made 5 service calls. If you switch on the "Highlight REST Resources on Screen" toggle button, you will see that by following REST principles we have split our services by the different types of resources we have

- Clients
- Accounts
- Balances
- Branch
- Product

This is classic underfetching. A single service call is not enough to satisfy our data requirements, so we have to keep going back for more. Obviously you can mitigate this with various techniques, like having a orchestration layer, or adding caching, but the point is you *have* to think about it, and every scenario is different. For example you may want to cache product information, but not account balances as one could be considerably more volatile than the other.

The other thing that is not immediately apparent looking at the screen is the overfetching. The Client service for example may be returning, date of birth, address, ID information etc that we don't need to satisfy our data requirements. The side effect of this is a lot of unnecessary data transfer.

Both the underfetching and overfetching problems affect the scalability of the REST solution.

- Select the "Clients" tab and select "Claire" 
- Select the "REST" tab and click the "REST" button.

We now see that in order to populate the same screen with someone with 15 accounts, 61 service calls are now required, and this results in each of those calls making (at least) one call to the database. 

### GraphQL Backend

Let's compare that REST example directly with GraphQL implementation

- Select the "GraphQL" tab and click the "GraphQL" button.

Here we see the same screen rendered for "Claire" with a GraphQL backend. GraphQL has taken care of the overfetching problem by allowing us to specify exactly what attributes we are interested in. It has address the underfetching problem somewhat but it has really just pushed that problem down a tier to the service tier, and the GraphQL Resolvers/Data Fetchers make multiple trips to the database to retrieve the data. 

This means we still have an N+1 problem, it just exists at a different tier in the architecture.

Both of the above solutions have in common the fact that we are implementing our notional graph outside of the graph capable database. In fact if you have a look at the avobank database on the Arango instance, you will see it only uses document collections, we are not using edge collections as the graph is actually implemented in the client tier for REST and service tier for vanilla GraphQL solution. The client code, or GraphQL resolvers are performing the Graph traversals.

### ArangoDB GraphQL Spring Boot Starter Backend

With ArangoDB GraphQL Spring Boot Starter, we push the Graph traversals down to the database tier, and perform them using the native graph capabilities in ArangoDB, as close to the data as possible for maximum efficiency.

If we compare the Arango GraphQL solution with the previous solutions

- Select the "Clients" tab and select "Rick" 
- Select the "GraphQL Arango" tab and click the "GraphQL" button.

You will notice a single call between client and service tier, and a single call between service and database.

- Select the "Clients" tab and select "Claire" 
- Select the "GraphQL Arango" tab and click the "GraphQL" button.

You will notice that the same screen with the same data is rendered for Claire, however with only a single call between client and service tier, and a single call between service and database. Note that in comparison to the last two solutions that regardless of the volume of data, only a single call is made. This is because the graph traversals are all happening in the database as close to the data as possible. In this example we use a slightly different database, avobank-graph, which makes use of edge collections in order to represent our graph.

# Benefits

The benefits of this are

- Increased performance
- Increased developer productivity (less code)
- Leveraging the Graph capabilities of your graph capable database.

# What's next?

Have a look at the example backend implementations in the services directory, for a deeper understanding of the implementation differences.

Have a look at the ArangoDB GraphQL Spring Boot Starter README to check out the features of the library.
