import React, { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components/native';

import { Animated } from 'react-native';

import { Card } from './components/Card';
import { Swipable } from './components/Swipable';

const SView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const SImage = styled.Image`
  height: 43%;
  width: 100%;
`;

interface Data {
  liked: null | boolean;
  uri: string;
}

const data: Data[] = [
  {
    uri:
      'http://gdj.graphicdesignjunction.com/wp-content/uploads/2012/05/large/movie-poster-20.jpg',
    liked: null,
  },
  {
    uri:
      'http://gdj.graphicdesignjunction.com/wp-content/uploads/2012/05/large/movie-poster-20.jpg',
          liked: null,
  },
  {
    uri:
      'http://gdj.graphicdesignjunction.com/wp-content/uploads/2012/05/large/movie-poster-20.jpg',
          liked: null,
  },
  {
    uri:
      'http://gdj.graphicdesignjunction.com/wp-content/uploads/2012/05/large/movie-poster-20.jpg',
          liked: null,
  },
];

export default function App() {
  const position = useMemo(() => new Animated.ValueXY(), []);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>();

  useEffect(() => {
    if (direction === 'left') {
      console.log(currentCardIndex,  data);
      data[currentCardIndex].liked = false;
    } else if (direction === 'right') {
      data[currentCardIndex].liked = true;
      console.log(currentCardIndex, data);
    }
  

  }, [direction, currentCardIndex]);

  useEffect(() => {
    setDirection(undefined);
  }, [currentCardIndex]);

  useEffect(() => {
    const onPosition = ({value}: {value: number}) => {
      if (direction !== 'right') {
        console.log('not right', direction);
        value > 0 && setDirection('right');
      } else if (direction !== 'left' ) {
        console.log('not left', direction);
        value < 0 && setDirection('left');
      }
      return 'onPosition';
    };

    position.x.addListener(onPosition);

    return () => {
      position.x.removeListener('onPosition');
    }
  }, []);

  return (
    <SView>
      <Animated.View
        style={{
          height: '100%',
          width: '100%',
          opacity: position.y.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
          }),
        }}
      >
        <SImage
          source={{
            uri:
              'https://www.drupal.org/files/project-images/like_and_dislike.png',
          }}
        />
      </Animated.View>
      <Swipable position={position} setDirection={setDirection} setCurrentCardIndex={setCurrentCardIndex} currentCardIndex={currentCardIndex}>
        {data.map(({uri}, i) => (
          <Card
            key={i}
            source={{ uri }}
          />
        ))}
      </Swipable>
    </SView>
  );
}
