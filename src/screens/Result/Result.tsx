import React from 'react';
import { View, Text } from 'react-native';

import { stuntsDoubles } from '../../services/api';

import { ViewWrapper, ImageSet, Title, Image } from './Result.styles';

const getLikedStunts = () =>
  stuntsDoubles.map(stunt => ({
    ...stunt,
    stunts: stunt.stunts.filter(({liked}) => liked),
  }));

const Result: React.FC = () => {
  return (
    <ViewWrapper>
      {getLikedStunts().map(({original: {name}, stunts}, i) => (
        <React.Fragment key={`${i}-stunt-doubles`}>
          <View>
            <Title>{name}'s look alike</Title>
          </View>
          <ImageSet
            horizontal={true}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {stunts.length === 0 && <View><Text>{name} is unique!</Text></View>}
            {stunts.map(({image}, i) => (
              <View key={`${i}-image`}>
                <Image source={image} />
              </View>
            ))}
          </ImageSet>
        </React.Fragment>
      ))}
    </ViewWrapper>
  );
};

export default Result;
