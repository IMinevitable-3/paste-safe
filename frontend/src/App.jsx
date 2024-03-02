import { Layout } from "./pages/layout";
import { Routes, Route } from "react-router-dom";
import { Index } from "./pages/index";
import { ContentPage } from "./pages/content";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/:slug" element={<ContentPage />} />
      </Route>
    </Routes>
  );
}
