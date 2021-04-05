import React from "react";
import Editor from "react-simple-code-editor";
import Highlight, { Prism } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

function BaseEditor({
  value,
  onValueChange = () => {},
  disabled = false,
  language = "jsx",
  height = "100%",
}) {
  // we need this so arrow key events don't bubble up to the slide player
  function handleKeyDown(e) {
    e.nativeEvent.stopImmediatePropagation();
  }

  return (
    <Editor
      value={value}
      onValueChange={onValueChange}
      highlight={(code) => highlightCode(code, language)}
      onKeyDown={handleKeyDown}
      padding={16}
      disabled={disabled}
      style={{
        whiteSpace: "pre",
        fontFamily: "monospace",
        fontSize: "1.5rem",
        fontWeight: "normal",
        overflow: "auto",
        height: height,
        caretColor: "red",
      }}
    />
  );
}

function highlightCode(code, language) {
  return (
    <Highlight Prism={Prism} theme={theme} code={code} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <React.Fragment>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </React.Fragment>
      )}
    </Highlight>
  );
}

export default BaseEditor;
