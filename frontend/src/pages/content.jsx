import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { PlaintextRenderer, CodeRenderer } from "./preview";

function ExpireDate() {
  const expiryDate = new Date("2024-02-25T14:58:37.110979Z");

  const currentDate = new Date();

  const timeDifference = expiryDate - currentDate;

  const seconds = Math.floor((timeDifference / 1000) % 60);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return (
    <>
      <p>
        This Document expires in {days}days {hours} hours{" "}
      </p>
    </>
  );
}
export function ContentPage() {
  const [apiData, setApiData] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  let apiUrlCheck = `http://localhost:8000/api/check/?slug=${slug}`;

  useEffect(() => {
    if (import.meta.env.PROD)
      apiUrlCheck =
        import.meta.env.VITE_BASE_URL +
        import.meta.env.VITE_CHECK_PASSWORD +
        `?slug=${slug}`;
    fetch(apiUrlCheck)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setApiData(data);

        if (data.password) {
          setLoading(false);
        } else {
          authenticateAndFetchContent(null);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiUrlCheck]);

  const authenticateAndFetchContent = async (Password) => {
    try {
      let apiUrl = apiUrlCheck;
      if (import.meta.env.PROD)
        apiUrl =
          import.meta.env.VITE_BASE_URL +
          import.meta.env.VITE_CHECK_PASSWORD +
          `?slug=${slug}`;
      const response = await axios.post(apiUrl, { password: Password });

      if (response.status === 200) {
        // console.log(response);
        const data = response.data;
        setIsAuth(true);
        setLoading(false);
        setApiData(data);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    authenticateAndFetchContent(password);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : isAuth ? (
        <>
          <ExpireDate></ExpireDate>
          {apiData.document_format === "Markdown" ? (
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {apiData.text}
            </Markdown>
          ) : apiData.document_format === "Text" ? (
            <PlaintextRenderer text={apiData.text} />
          ) : (
            <CodeRenderer code={apiData.text}></CodeRenderer>
          )}
        </>
      ) : (
        <div>
          <p>This content is password protected.</p>
          <form onSubmit={handlePasswordSubmit}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
