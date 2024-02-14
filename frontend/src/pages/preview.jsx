import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useConfig } from "../context/configContext";

const PlaintextRenderer = ({ text }) => {
  return (
    <SyntaxHighlighter language="plaintext" style={docco}>
      {text}
    </SyntaxHighlighter>
  );
};

const CodeRenderer = ({ code }) => {
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {code}
    </SyntaxHighlighter>
  );
};

export const PreviewLoader = ({ markdown }) => {
  const { configuration, updateConfiguration } = useConfig();
  const [PreviewFormat, setPreviewFormat] = useState(
    configuration.document_format
  );
  useEffect(() => {
    setPreviewFormat(configuration.document_format);
  }, [configuration.document_format]);
  return (
    <>
      {/* <button
        onClick={() => {
          console.log(configuration.document_format);
        }}
      >
        Button
      </button> */}
      {PreviewFormat === "Markdown" ? (
        <Markdown rehypePlugins={[rehypeHighlight]}>
          {configuration.text}
        </Markdown>
      ) : PreviewFormat === "Text" ? (
        <PlaintextRenderer text={configuration.text} />
      ) : (
        <CodeRenderer code={configuration.text}></CodeRenderer>
      )}
    </>
  );
};
