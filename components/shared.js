import styled, { keyframes } from "styled-components";
import logo from "../assets/logo.svg";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Logo = styled.img.attrs({ src: logo, alt: "React Logo" })`
  height: 40vmin;
  animation: ${rotate} infinite 20s linear;
`;

export const FullPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  width: 100%;
  height: 75%;
`;

export const PanelWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-shadow: rgb(0 0 0 / 50%) 0px 2px 10px 0px;
  background-color: hsl(0, 0%, 10%);
`;

export const Panel = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
`;

export const PreviewPanel = styled(Panel)`
  background-color: hsl(0, 0%, 20%);
  border-left: 3px solid black;
`;

export const PanelHeading = styled.h2`
  margin: 0;
  padding: 8px;
  background-color: gray;
  color: white;
  font-size: 1.5rem;
`;

export const Error = styled.pre`
  font-size: 1.25rem;
  color: red;
  background-color: hsl(0, 0%, 90%);
  padding: 16px;
  margin: 0;
  height: 200px;
  overflow: auto;
`;
