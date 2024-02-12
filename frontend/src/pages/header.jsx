import { useContext, useState } from "react";
import "../assets/css/header.css";
import { useConfig } from "../context/configContext";
import axios from "axios";

const ExpiryTime = () => {
  const { configuration, updateConfiguration } = useConfig();
  const [Time, setTime] = useState("");

  const handleSelectChange = (event) => {
    setTime(event.target.value);
    updateConfiguration({ expiry_duration: event.target.value });
  };

  return (
    <div>
      <label htmlFor="Expire">Expire Time:</label>
      <select id="Expire" value={Time} onChange={handleSelectChange}>
        <option value="1d">1 Day</option>
        <option value="1w">1 Week</option>
        <option value="1m">1 Month</option>
      </select>
    </div>
  );
};
const DocFormat = () => {
  const [Format, setFormat] = useState("");
  const { configuration, updateConfiguration } = useConfig();

  const handleSelectChange = (event) => {
    setFormat(event.target.value);
    updateConfiguration({ document_format: event.target.value });
  };

  return (
    <div>
      <label htmlFor="doc">Document Format:</label>
      <select id="doc" value={Format} onChange={handleSelectChange}>
        <option value="Markdown">Markdown</option>
        <option value="Text">Text</option>
        <option value="Code">Code</option>
      </select>
    </div>
  );
};

const PasswordInput = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { configuration, updateConfiguration } = useConfig();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    updateConfiguration({ password: event.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor="password">Password:</label>
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button type="button" onClick={toggleShowPassword}>
        {showPassword ? "Hide" : "Show"} Password
      </button>
    </div>
  );
};
const SendButton = () => {
  const { configuration, updateConfiguration } = useConfig();
  const handleClick = async () => {
    console.log(configuration);

    try {
      const response = await axios.post(
        getDataBasedOnENV("POST_URL"),
        configuration
      );

      if (response.status === 200) {
        console.log(response);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <>
      <button onClick={handleClick}>Send</button>
    </>
  );
};
export const Header = () => {
  return (
    <>
      <div className="header">
        <ExpiryTime></ExpiryTime>
        <DocFormat></DocFormat>
        <PasswordInput></PasswordInput>
        <SendButton></SendButton>
      </div>
    </>
  );
};
