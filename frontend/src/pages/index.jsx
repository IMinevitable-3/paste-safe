import { Parent } from "./editor";
import { Header } from "./header";
import { ConfigProvider } from "../context/configContext";
export function Index() {
  return (
    <>
      <ConfigProvider>
        <div className="super-container">
          <div className="header-container">
            <Header></Header>
          </div>
        </div>
        <Parent></Parent>
      </ConfigProvider>
    </>
  );
}
