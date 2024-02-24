import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
        console.log(response);
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
