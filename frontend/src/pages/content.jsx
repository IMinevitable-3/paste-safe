import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export function ContentPage() {
  const [apiData, setApiData] = useState(null);
  const { slug } = useParams();
  let apiUrl = `http://localhost:8000/api/pastes/?slug=${slug}`;
  if (import.meta.env.PROD) {
    apiUrl = import.meta.env.VITE_BASE_URL + `?slug=${slug}`;
  }

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setApiData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiUrl]);

  return (
    <div>
      <h1>API Response:</h1>
      {apiData ? (
        <pre>{JSON.stringify(apiData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
