import { useMemo } from 'react';
import { Animated, GestureResponderEvent, PanResponder, PanResponderGestureState, Platform, Dimensions, PanResponderInstance } from "react-native";

const isWeb = Platform.OS === 'web';
const { width: WINDOW_WIDTH } = Dimensions.get('window');

export interface IPanResponderProps {
  position: Animated.ValueXY;
  onSpringStart: () => void;
  variableValues: unknown[]
}

const onPanResponderRelease = ({
  position,
  onSpringStart,
}: IPanResponderProps) => (
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

  if (x > 100) {
    options.toValue = { x: WINDOW_WIDTH + 150, y };
  } else if (x < -100) {
    options.toValue = { x: -WINDOW_WIDTH - 150, y };
  } else {
    onStart = () => {};
  }

  Animated.spring(position, options).start(() => {
    onStart();
  });
};

const onPanResponderMove = (position: IPanResponderProps['position']) => (_:GestureResponderEvent , { dx: x, dy: y }: PanResponderGestureState) => {
  position.setValue({ x, y });
}

const usePanResponder = ({
  position,
  onSpringStart,
  variableValues
}: IPanResponderProps): PanResponderInstance => {
   const panResponder = useMemo(() => {
    return PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: onPanResponderMove(position),
        onPanResponderRelease: onPanResponderRelease({ position, onSpringStart }),
    });
  }, variableValues);
  
  return panResponder;
};

export default usePanResponder;
