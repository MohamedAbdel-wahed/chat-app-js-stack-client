import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws'



let httpLink = createHttpLink({
  uri: 'https://pensa-chat.herokuapp.com/',
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

// adding auth & http llinks together
httpLink= authLink.concat(httpLink)

const wsLink = new WebSocketLink({
  uri: `ws://https://pensa-chat.herokuapp.com/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});


function ApolloServiceProvider(props) {
    return <ApolloProvider client={client} {...props}></ApolloProvider>
}

export default ApolloServiceProvider
