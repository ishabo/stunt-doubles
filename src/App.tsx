import React from 'react';
import styled from 'styled-components/native';

import { StuntDoubles, Movie } from './screens/StuntDoubles';

const Layout = styled.View`
  background-color: #fff;
  width:100%;
  height: 100%;
`;

const movie: Movie[] = [
  {
    title: 'Gulp fiction',
    image: require('./assets/pulp-fiction.jpg'),
    liked: null,
  },
  {
    title: 'clockwork-orange',
    image: require('./assets/clockwork-orange.jpg'),
    liked: null,
  },
  {
    title: 'Fear Loathing in Las Vegas',
    image: require('./assets/fear-loathing-in-las-vegas.jpg'),
    liked: null,
  },
  {
    title: 'The Exorcist',
    image: require('./assets/the-exorcist.jpg'),
    liked: null,
  },
  {
    title: 'JAWS',
    image: require('./assets/jaws.jpg'),
    liked: null,
  },
];

export default function App() {

  return (
    <Layout> 
      <StuntDoubles movies={movie} />
    </Layout>
  );
}
