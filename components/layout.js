import React from "react";
import { useDeck } from "mdx-deck";
import styled from "styled-components";

function Layout({ children }) {
  return (
    <Wrapper>
      {children}
      <Navigator />
    </Wrapper>
  );
}

function Navigator() {
  const { length, index, setIndex } = useDeck();

  let steps = new Array(length);
  for (let i = 0; i < length; i++) steps[i] = i;

  return (
    <DotWrapper>
      {steps.map((step) => (
        <Dot
          onClick={() => setIndex(step)}
          active={step <= index}
          title={`go to: ${step}`}
          color="text"
        ></Dot>
      ))}
    </DotWrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.button`
  appearance: none;
  border: 4px solid transparent;
  background-clip: padding-box;
  border-radius: 9999px;
  width: 8px;
  height: 8px;
  opacity: ${(p) => (p.active ? 0.5 : 0.125)};
  margin: 0px;
  padding: 4px;
  color: rgb(0, 0, 0);
  background-color: rgb(0, 0, 0);

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 1px;
  }
`;

const DotWrapper = styled.nav`
  position: fixed;
  bottom: 32px;
  display: flex;
  justify-content: center;
`;

export default Layout;
