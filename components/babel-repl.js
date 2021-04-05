import React, { useState, useEffect } from "react";
import * as babel from "@babel/standalone";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import BaseEditor from "./base-editor";
import { getCode } from "../utils";
import {
  Error,
  Panel,
  PanelHeading,
  PanelWrapper,
  PreviewPanel,
  Wrapper,
} from "./shared";

function transpile(input) {
  const output = babel.transform(input, {
    presets: ["env", "react"],
    retainLines: true,
  }).code;
  return prettier.format(output, {
    parser: "babel",
    plugins: [parserBabel],
  });
}

function BabelRepl({ children }) {
  const [input, setInput] = useState(() => getCode(children));
  const [output, setOutput] = useState(() => transpile(input));
  const [error, setError] = useState("");

  console.log(output);

  useEffect(() => {
    const interval = setTimeout(() => {
      try {
        setOutput(transpile(input));
        setError("");
      } catch (e) {
        setError(e.message.toString());
      }
    }, 1000);

    return function cleanup() {
      clearInterval(interval);
    };
  }, [input]);

  return (
    <Wrapper>
      <PanelWrapper>
        <Panel>
          <PanelHeading>The Code You Write</PanelHeading>
          <BaseEditor value={input} onValueChange={setInput} />
          {error.length > 0 && (
            <Error>
              <code>{error}</code>
            </Error>
          )}
        </Panel>
        <PreviewPanel>
          <PanelHeading>The Code the Browser Runs</PanelHeading>
          <BaseEditor value={output} onValueChange={setOutput} />
        </PreviewPanel>
      </PanelWrapper>
    </Wrapper>
  );
}

export default BabelRepl;
