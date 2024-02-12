import { createContext, useContext, useState } from "react";

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const initialConfiguration = {
    expiry_duration: "1d",
    document_format: "Markdown",
    password: null,
    text: null,
  };

  const [configuration, setConfiguration] = useState(initialConfiguration);

  const updateConfiguration = (newConfig) => {
    setConfiguration((prevConfig) => ({ ...prevConfig, ...newConfig }));
  };

  return (
    <ConfigContext.Provider value={{ configuration, updateConfiguration }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  return useContext(ConfigContext);
};
