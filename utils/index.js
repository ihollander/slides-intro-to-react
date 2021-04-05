import React from "react";

/*
Used to read text children from MDX components

<BabelRepl>
```js
const thisCode = "will be returned"
```
</BabelRepl>
*/
function getCode(children) {
  const pre = React.Children.toArray(children).find(
    (el) => el?.props?.mdxType === "pre"
  );
  if (!pre) return "";

  const code = React.Children.toArray(pre.props.children).find(
    (el) => el?.props?.mdxType === "code"
  );
  if (!code) return "";

  return code.props.children;
}

export { getCode };
