import styled from 'styled-components/native';

export const ViewWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  position: relative; 
`;

export const Title = styled.Text`
  font-size: 32px;
  color: white;
  z-index: 10;
  background-color:rgba(0, 0, 0, 0.2);
  padding: 1%;
  position: absolute;
  bottom: -10;
`;

export const CoverView = styled.View`
  width: 350px; 
  height: 550px;
  flex-direction: column;
  position: relative;
`;

export const CoverImage = styled.Image `
  width: 100%;
  height: 100%;
`;

export const ActionButton = styled.Button`
  position: absolute;
  bottom: 100px;
`;
