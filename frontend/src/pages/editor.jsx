import React, { useContext, useState } from "react";
import { useQuill } from "react-quilljs";
import { useConfig } from "../context/configContext";

import "quill/dist/quill.snow.css";
import { PreviewLoader } from "./preview";

export const Editor = ({ func }) => {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: false,
    },
    style: {
      width: "100%",
      height: "100%",
      maxWidth: "50%", // Set max-width to 50%
      overflowX: "auto",
    },
  });
  const { configuration, updateConfiguration } = useConfig();

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        const Txt = quill.getText();
        updateConfiguration({ text: Txt });
        func(Txt);
      });
    }
  }, [quill]);

  return (
    <div
      ref={quillRef}
      className="w-full border-2 h-screen text-secondary text-l "
    />
  );
};
export const Parent = () => {
  const [Text, setText] = useState(null);
  const [showEditor, setShowEditor] = useState("preview");

  return (
    <>
      <button
        onClick={() => {
          if (showEditor === "editor") setShowEditor("preview");
          else setShowEditor("editor");
        }}
        className="m-1 p-2 hover:shadow-sm  border-secondary rounded  border-2 hover:text-secondary"
      >
        {showEditor}
      </button>
      <div className="flex justify-start my-2 mx-5">
        <div
          className="max-w-full container h-screen"
          style={{ display: showEditor === "preview" ? "block" : "none" }}
        >
          <Editor func={setText} />
        </div>
        <div
          className="max-w-full container  h-screen"
          style={{ display: showEditor === "editor" ? "block" : "none" }}
        >
          <PreviewLoader markdown={Text} />
        </div>
      </div>
    </>
  );
};
