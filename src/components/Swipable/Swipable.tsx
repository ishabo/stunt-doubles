import React, { useMemo, useState, useEffect } from 'react';
import {
  Animated,
  PanResponder,
  PanResponderInstance,
  PanResponderGestureState,
  GestureResponderEvent,
  Dimensions,
  Platform,
} from 'react-native';

const isWeb = Platform.OS === 'web';
const { width: WINDOW_WIDTH } = Dimensions.get('window');

interface IPanResponderProps {
  position: Animated.ValueXY;
  onSpringStart: () => void;
  setDirection: (direction: 'left' | 'right') => void;
}

const onPanResponderRelease = ({
  position,
  onSpringStart,
}: Omit<IPanResponderProps, 'setDirection'>) => (
  _: GestureResponderEvent,
  gestureState: PanResponderGestureState,
) => {
  const { dy: y, dx: x } = gestureState;
  let onStart = onSpringStart;
  const options = {
    toValue: { x: 0, y: 0 },
    restSpeedThreshold: 100,
    restDisplacementThreshold: 40,
    useNativeDriver: !isWeb,
  };

  if (x > 120) {
    options.toValue = { x: WINDOW_WIDTH + 100, y };
  } else if (x < -120) {
    options.toValue = { x: -WINDOW_WIDTH - 100, y };
  } else {
    onStart = () => {};
  }

  Animated.spring(position, options).start(() => {
    onStart && onStart();
  });
};

const createPanResponder = ({
  position,
  onSpringStart,
  setDirection,
}: IPanResponderProps): PanResponderInstance => {
  return PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx: x, dy: y }) => {
      position.setValue({ x, y });
    },
    onPanResponderRelease: onPanResponderRelease({ position, onSpringStart }),
  });
};

interface SwipableProps {
  children: React.ReactElement<{}>[];
  position: IPanResponderProps['position'];
  setDirection: IPanResponderProps['setDirection'];
  currentCardIndex: number;
  setCurrentCardIndex: (index: number) => void;
}

const Swipable: React.FC<SwipableProps> = ({ children, position, setDirection, setCurrentCardIndex, currentCardIndex }) => {
  const childrenArr = Array.isArray(children) ? children : [children]; 

  const onSpringStart = () => {
    position.setValue({ x: 0, y: 0 });
    setCurrentCardIndex(currentCardIndex + 1);
  };

  const panResponder = useMemo(() => {
    return createPanResponder({ position, onSpringStart, setDirection });
  }, [currentCardIndex]);

  const rotate = position.x.interpolate({
    inputRange: [-WINDOW_WIDTH / 2, 0, WINDOW_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const rotateAndTranslate = {
    transform: [
      {
        rotate,
      },
      ...position.getTranslateTransform(),
    ],
  };

  return childrenArr.map((child: React.ReactElement<{}>, index) => {
    let props = { style: { position: 'absolute' } };

    if (index < currentCardIndex) {
      return null;
    }
    if (index === currentCardIndex) {
      props = {
        style: [rotateAndTranslate, { ...props.style, zIndex: 1 }],
        ...panResponder.panHandlers,
      };
    }

    return <Animated.View {...props}>{child}</Animated.View>;
  });
};

export default Swipable;
