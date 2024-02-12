import { createContext, useContext, useState } from "react";

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const initialConfiguration = {
    expiry_time: "1 day",
    document_format: "markdown",
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
