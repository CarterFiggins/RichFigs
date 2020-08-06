// Load all the channels within this directory and all subdirectories.
// Channel files must be named *_channel.js.
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

const channels = require.context('.', true, /_channel\.js$/)
channels.keys().forEach(channels)
