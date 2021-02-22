import React from 'react';
import styled from 'styled-components/native';

import { StuntDoubles } from './screens/StuntDoubles';

const Layout = styled.View`
 background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  padding: 8%;
`;

export default function App() {
  return (
    <Layout>
      <StuntDoubles />
    </Layout>
  );
}
