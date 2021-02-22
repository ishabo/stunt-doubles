import React from 'react';
import { Animated } from 'react-native';
import usePanResponder, { IPanResponderProps } from './hooks/usePanResponder';

interface SwipableProps {
  children: React.ReactElement<{}>[];
  position: IPanResponderProps['position'];
  currentCardIndex: number;
  setCurrentCardIndex: (index: number) => void;
}

const Swipable: React.FC<SwipableProps> = ({
  children,
  position,
  setCurrentCardIndex,
  currentCardIndex,
}) => {
  const childrenArr = Array.isArray(children) ? children : [children];

  const onSpringStart = () => {
    position.setValue({ x: 0, y: 0 });
    setCurrentCardIndex(currentCardIndex + 1);
  };

  const panResponder = usePanResponder({
    position,
    onSpringStart,
    variableValues: [currentCardIndex],
  });

  const rotate = position.x.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: ['-20deg', '0deg', '20deg'],
  });

  const rotateAndTranslate = {
    transform: [
      {
        rotate,
      },
      ...position.getTranslateTransform(),
    ],
  };

  return childrenArr
    .map((child: React.ReactElement<{}>, index) => {
      let props = {
        style: {
          position: 'absolute',
          marginTop: (index + 1) * 6,
          marginRight: index * 6,
        },
      };

      if (index < currentCardIndex) {
        return null;
      }

      if (index === currentCardIndex) {
        props = {
          style: [rotateAndTranslate, { ...props.style, zIndex: 1 }],
          ...panResponder.panHandlers,
        };
      }

      return (
        <Animated.View key={index} {...props}>
          {child}
        </Animated.View>
      );
    })
    .reverse();
};

export default Swipable;
