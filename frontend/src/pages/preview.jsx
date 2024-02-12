import React, { useState } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

export const PreviewLoader = ({ markdown }) => {
  return (
    <>
      <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>
    </>
  );
};
