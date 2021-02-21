import React, { useMemo, useEffect, useState } from 'react';
import { Animated, ImageSourcePropType } from 'react-native';

import { Card } from '../../components/Card';
import { Swipable } from '../../components/Swipable';

import { LikeDislike, StuntDoublesWrapper, MoviesStack } from './StuntDoubles.styles';

export interface Movie {
  title: string;
  liked: null | boolean;
  image: ImageSourcePropType;
}

type Direction = 'left' | 'right' | undefined;

interface StuntDoublesProps {
    movies: Movie[];
}

const StuntDoubles: React.FC<StuntDoublesProps> = ({movies}) => {
  const position = useMemo(() => new Animated.ValueXY(), []);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>();

  console.log(movies, currentCardIndex);
  useEffect(() => {
      const index = currentCardIndex - 1;
      if (currentCardIndex > 0 && !movies[index].liked) {
    if (direction === 'left') {
      console.log(index,  movies);
      movies[index].liked = false;
    } else if (direction === 'right') {
      movies[index].liked = true;
      console.log(index, movies);
    }
}
  
  }, [direction, currentCardIndex]);

  useEffect(() => {
    setDirection(undefined);
  }, [currentCardIndex]);

  useEffect(() => {
    const onPosition = ({value}: {value: number}) => {
      if (direction !== 'right' && value > 0) {
         setDirection('right');
      }
      if (direction !== 'left' && value < 0) {
         setDirection('left');
      }
      
      return 'onPosition';
    };

    position.x.addListener(onPosition);

    return () => {
      position.x.removeListener('onPosition');
    }
  }, []);

  return (
    <StuntDoublesWrapper>
      {direction && <Animated.View
        style={{
            height: 150,
            width: 100,
            zIndex: 10,
            position: 'absolute',
            top: 0,
          opacity: position.y.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
          }),
        }}
      >
        <LikeDislike
          source={direction === 'right' ? require('../../assets/like.png') : require('../../assets/dislike.png')}
        />
      </Animated.View>}
      <MoviesStack>
        <Swipable position={position} setDirection={setDirection} setCurrentCardIndex={setCurrentCardIndex} currentCardIndex={currentCardIndex}>
            {movies.map(({image}, i) => (
            <Card
                key={i}
                source={image}
            />
            ))}
        </Swipable>
      </MoviesStack>
    </StuntDoublesWrapper>
  );
}

export default StuntDoubles;
