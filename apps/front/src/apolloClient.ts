import { ApolloClient, InMemoryCache } from '@apollo/client';

import { gql } from '@apollo/client';
import { GetPersonByFirstNameResponse } from './components/typs';

export const apoloClient = new ApolloClient({
    uri: 'http://localhost:3001/graphql', 
    cache: new InMemoryCache(),
  });
  
export const fetchPersonByFirstName = async () => {
    try {
      // Set loading to true initially
      const result: GetPersonByFirstNameResponse = await apoloClient.query({
        query: gql`
          query MyQuery {
            getPersonByFirstName(first: 1, pFirstName: "dad") {
              edges {
                node {
                  id
                  lastName
                }
              }
            }
          }
        `,
      });
  
      return result.data.getPersonByFirstName.edges[0].node;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  




