import React from 'react';
import styled, { keyframes } from "styled-components";

const webkitAnimation = keyframes`
    0% { -webkit-transform: perspective(120px) }
    50% { -webkit-transform: perspective(120px) rotateY(180deg) }
    100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
`;

const animation = keyframes`
    0% { 
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg) 
    } 50% { 
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg) 
    } 100% { 
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
`;

const LoaderStyled = styled.div`
    width: 40px;
    height: 40px;
    background-color: #6441A4;
  
    margin: 100px auto;
    -webkit-animation: ${webkitAnimation} 1.2s infinite ease-in-out;
    animation: ${animation} 1.2s infinite ease-in-out;
`;

/**
 * Loader
 * 
 * Component that displays an animated loading square
 * @returns {Object} JSX
 */
const Loader = () => (
    <LoaderStyled />
);

 export default Loader;