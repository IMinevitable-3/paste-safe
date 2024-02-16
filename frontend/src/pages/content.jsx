import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function ContentPage() {
  const [apiData, setApiData] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const apiUrlCheck = `http://localhost:8000/api/check/?slug=${slug}`;
  const apiUrlPaste = `http://localhost:8000/api/paste/?slug=${slug}`;

  useEffect(() => {
    // Check if password is required
    fetch(apiUrlCheck)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);

        if (data.password) {
          // If there is a password required, stop loading to show password form
          setLoading(false);
        } else {
          // If no password required, authenticate and fetch content directly
          authenticateAndFetchContent(null); // Pass null as there's no password
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiUrlCheck]);

  const authenticateAndFetchContent = (enteredPassword) => {
    const apiUrl =
      apiUrlPaste + (enteredPassword ? `&password=${enteredPassword}` : "");

    // Fetch content with or without password
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Authentication successful, set isAuth and show content
        setIsAuth(true);
        setLoading(false);
        setApiData(data);
      })
      .catch((error) => {
        // Authentication failed or other error
        console.error("Error fetching content:", error);
        setLoading(false);
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    authenticateAndFetchContent(password);
  };

  return (
    <div>
      <h1>API Response:</h1>
      {loading ? (
        <p>Loading...</p>
      ) : isAuth ? (
        <pre>{JSON.stringify(apiData, null, 2)}</pre>
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
