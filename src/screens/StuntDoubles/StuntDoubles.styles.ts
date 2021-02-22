import styled from 'styled-components/native';

export const ViewWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 24;
  position: absolute;
  color: white;
  bottom: 50;
  z-index: 10;
  background-color:rgba(0, 0, 0, 0.5);
  padding: 2%;
`;

export const CoverView = styled.View`
  width: 350;
  height: 550;
  flex-direction: column;
  position: relative;
`;

export const CoverImage = styled.Image `
  width: 100%;
  height: 100%;
`;

export const ActionButton = styled.Button`
  position: absolute;
  bottom: 100;
`;
