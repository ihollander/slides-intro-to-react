import React, { useEffect, useRef, useState } from "react";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import styled from "styled-components";
import { getCode } from "../utils";
import BaseEditor from "./base-editor";
import {
  Error,
  FullPageWrapper,
  Panel,
  PanelHeading,
  PanelWrapper,
  PreviewPanel,
} from "./shared";

function LiveEditor({ children }) {
  const [input, setInput] = useState(() => getCode(children));
  const [html, setHtml] = useState("");
  const previewRef = useRef();

  useEffect(() => {
    const previewEl = previewRef.current?.querySelector("#live-preview");
    if (previewEl) {
      // TODO: need a way to run this when LivePreview updates, which will be after input updates...
      // or a way to replace innerHTML altogether and get the React tree rendering result another way
      const interval = setTimeout(() => {
        const html = prettier.format(
          `<div id="root">${previewEl.innerHTML}</div>`,
          {
            parser: "html",
            plugins: [parserHtml],
          }
        );
        setHtml(html);
      }, 300);

      return function cleanup() {
        clearInterval(interval);
      };
    }
  }, [input]);

  function handleTransform(code) {
    // pretend that the render method from react-live is using ReactDOM.render
    return code.replace("ReactDOM.render", "render");
  }

  return (
    <LiveProvider code={input} noInline transformCode={handleTransform}>
      <FullPageWrapper>
        <PanelWrapper>
          <Panel>
            <PanelHeading>React Code</PanelHeading>
            <BaseEditor value={input} onValueChange={setInput} />
            <Error as={LiveError} />
          </Panel>
          <PreviewPanel>
            <PanelHeading>Preview</PanelHeading>
            <Preview ref={previewRef}>
              <StyledLivePreview id="live-preview" />
            </Preview>
            <PanelHeading>HTML Output</PanelHeading>
            <BaseEditor
              value={html}
              onValueChange={setHtml}
              language="html"
              height="50%"
            />
          </PreviewPanel>
        </PanelWrapper>
      </FullPageWrapper>
    </LiveProvider>
  );
}

const Preview = styled.div`
  background-color: white;
  color: black;
  padding: 16px;
  overflow: auto;
  height: 50%;
`;

const StyledLivePreview = styled(LivePreview)`
  height: 100%;
`;

export default LiveEditor;
