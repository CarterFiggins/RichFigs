import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../components/App';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  uri: 'http://localhost:3000/graphql'
})

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

document.addEventListener('DOMContentLoaded', () => {
  const appDiv = document.body.appendChild(document.createElement('div'))
  appDiv.id = 'main-app'
  ReactDOM.render(
    <Router>
      <ApolloProvider client={client}>
          <Route path="/" component={App} />
      </ApolloProvider>
    </Router>,
    appDiv,
  )
})
