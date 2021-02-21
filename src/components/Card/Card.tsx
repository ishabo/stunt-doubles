import React from 'react';
import { CardWrapper, CardImage } from './Card.styles';
import { ImageSourcePropType } from 'react-native';

const Card: React.FC<{ source: ImageSourcePropType }> = ({ source }) => {
  return (
    <CardWrapper>
      <CardImage source={source} />
    </CardWrapper>
  );
};

export default Card;
