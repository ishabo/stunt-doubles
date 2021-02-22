import React from 'react';

import { Stack } from '../../components/Stack';
import { Result } from '../Result';
import { stuntsDoubles } from '../../services/api';

import {
  ViewWrapper,
  CoverView,
  CoverImage,
  Title,
  ActionButton,
} from './StuntDoubles.styles';

const StuntDoubles: React.FC = () => {
  const [currentStunt, setCurrentStunt] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);

  const onDone = () => {
    setCurrentStunt(currentStunt + 1);
    setHasStarted(false);
  };

  if (!stuntsDoubles[currentStunt]) {
    return <Result />;
  }

  return (
    <ViewWrapper>
      <Title>{stuntsDoubles[currentStunt].original.name}</Title>
      {hasStarted ? (
        <Stack data={stuntsDoubles[currentStunt].stunts} onDone={onDone} />
      ) : (
        <CoverView>
          <CoverImage source={stuntsDoubles[currentStunt].original.image} />
          <ActionButton title={'Start'} onPress={() => setHasStarted(true)} />
        </CoverView>
      )}
    </ViewWrapper>
  );
};

export default StuntDoubles;
