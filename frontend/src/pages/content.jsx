import { useParams } from "react-router-dom";

export function ContentPage() {
  const { slug } = useParams();

  console.log("Slug from URL:", slug);

  return (
    <>
      <h1>{slug}</h1>
    </>
  );
}
