import styled from 'styled-components/native';

export const StackWrapper = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
 `;

export const StackView = styled.View`
  width: 250;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const LikeDislike = styled.Image`
  justify-content: center;
  flex: 1;
`;

export const ImageWrapper = styled.View`
    height: 150;
    width: 100;
    z-index: 10;
    position: absolute;
    top: 0;
`;
