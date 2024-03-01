import { Parent } from "./editor";
import { Header } from "./header";
import { ConfigProvider } from "../context/configContext";
export function Index() {
  return (
    <div className="bg-tertiary ">
      <ConfigProvider>
        <Header></Header>
        <Parent></Parent>
      </ConfigProvider>
    </div>
  );
}
