import { useEffect } from "react";
import { useApi } from "../context/apiContext";
export function ContentPage({ slug }) {
  const { data, setData } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(slug);
        const response = await fetch(`http://localhost:8000/api/${slug}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [slug, setData]);

  return (
    <div>
      {data ? (
        <div>
          <h1>{data.text}</h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
