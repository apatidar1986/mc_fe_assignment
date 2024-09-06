import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const ShimmerWrapper = styled.div`
  width: 100%;
  height: 170px;
  background: #e0e0e0;  // Darker base color
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  display: flex;
  overflow: hidden;
`;

const ShimmerBase = styled.div`
  background-image: linear-gradient(
    to right,
    #e0e0e0 0%,
    #d0d0d0 20%,
    #e0e0e0 40%,
    #e0e0e0 100%
  );  // Darker gradient
  background-repeat: no-repeat;
  background-size: 800px 104px;
  animation-duration: 1.5s;  // Slowed down animation
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${shimmer};
  animation-timing-function: linear;
`;

const ShimmerImage = styled(ShimmerBase)`
  width: 100px;
  height: 150px;
  margin: 10px;
`;

const ShimmerContent = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ShimmerLine = styled(ShimmerBase)<{ width: string }>`
  height: 15px;
  width: ${props => props.width};
  margin-bottom: 10px;
`;

const ShimmerEffect: React.FC = () => {
  return (
    <ShimmerWrapper>
      <ShimmerImage />
      <ShimmerContent>
        <ShimmerLine width="70%" />
        <ShimmerLine width="50%" />
        <ShimmerLine width="60%" />
        <ShimmerLine width="40%" />
        <ShimmerLine width="30%" />
      </ShimmerContent>
    </ShimmerWrapper>
  );
};

export default ShimmerEffect;