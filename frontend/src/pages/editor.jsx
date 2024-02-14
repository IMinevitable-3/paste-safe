import React, { useContext, useState } from "react";
import { useQuill } from "react-quilljs";
import { useConfig } from "../context/configContext";

import "../assets/css/index.css";
import "quill/dist/quill.snow.css";
import { PreviewLoader } from "./preview";

export const Editor = ({ func }) => {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: false,
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

  return <div ref={quillRef} style={{ width: "100%", height: "100vh" }} />;
};
export const Parent = () => {
  const [Text, setText] = useState(null);

  return (
    <>
      <div className="base-container">
        <div className="container">
          <div className="editor-container">
            <Editor func={setText}></Editor>
          </div>
        </div>
        <div className="container">
          <div className="preview-container">
            <PreviewLoader markdown={Text}></PreviewLoader>
          </div>
        </div>
      </div>
    </>
  );
};
