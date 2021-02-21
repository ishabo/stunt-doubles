import React from 'react';
import styled from 'styled-components/native';

import { Card } from './components/Card';
import { Swipable } from './components/Swipable';

const SView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  return (
    <SView>
      <Swipable>
        <Card
          source={{
            uri:
              'http://gdj.graphicdesignjunction.com/wp-content/uploads/2012/05/large/movie-poster-20.jpg',
          }}
        />
        <Card
          source={{
            uri:
              'http://gdj.graphicdesignjunction.com/wp-content/uploads/2012/05/large/movie-poster-20.jpg',
          }}
        />
        <Card
          source={{
            uri:
              'http://gdj.graphicdesignjunction.com/wp-content/uploads/2012/05/large/movie-poster-20.jpg',
          }}
        />
        <Card
          source={{
            uri:
              'http://gdj.graphicdesignjunction.com/wp-content/uploads/2012/05/large/movie-poster-20.jpg',
          }}
        />
      </Swipable>
    </SView>
  );
}
