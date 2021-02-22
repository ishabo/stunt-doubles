import React, { useMemo, useEffect, useState } from 'react';
import { Animated, View, Text } from 'react-native';

import { Card } from '../../components/Card';
import { Swipable } from '../../components/Swipable';
import { Item } from '../../services/api';

import { LikeDislike, StackWrapper, StackView } from './Stack.styles';

type Direction = 'left' | 'right' | undefined;

interface StackProps {
  data: Item[];
  onDone(): void;
}

const Stack: React.FC<StackProps> = ({ data, onDone }) => {
  const position = useMemo(() => new Animated.ValueXY(), []);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>();

  useEffect(() => {
    const index = currentCardIndex - 1;
    if (currentCardIndex > 0 && !data[index].liked) {
      if (direction === 'left') {
        console.log(index, data);
        data[index].liked = false;
      } else if (direction === 'right') {
        data[index].liked = true;
        console.log(index, data);
      }
    }
    if (currentCardIndex >= data.length) {
      onDone();
    }
  }, [direction, currentCardIndex]);

  useEffect(() => {
    setDirection(undefined);
  }, [currentCardIndex]);

  useEffect(() => {
    const onPosition = ({ value }: { value: number }) => {
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
    };
  }, []);

  return (
    <StackWrapper>
      {direction && (
        <Animated.View
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
            source={
              direction === 'right'
                ? require('../../assets/like.png')
                : require('../../assets/dislike.png')
            }
          />
        </Animated.View>
      )}
      <StackView>
        <Swipable
          position={position}
          setCurrentCardIndex={setCurrentCardIndex}
          currentCardIndex={currentCardIndex}
        >
          {data.map(({ image }, i) => (
            <Card key={i} source={image} />
          ))}
        </Swipable>
      </StackView>
    </StackWrapper>
  );
};

export default Stack;
