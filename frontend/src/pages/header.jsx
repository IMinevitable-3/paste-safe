import { useContext, useState } from "react";
import { useConfig } from "../context/configContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ExpiryTime = () => {
  const { configuration, updateConfiguration } = useConfig();
  const [Time, setTime] = useState("");

  const handleSelectChange = (event) => {
    setTime(event.target.value);
    updateConfiguration({ expiry_duration: event.target.value });
  };

  return (
    <div className="m-2 p-2 ">
      <label htmlFor="Expire" className="mx-1">
        Expire Time:
      </label>
      <select
        id="Expire"
        value={Time}
        onChange={handleSelectChange}
        className="text-primary border-secondary rounded  border-2"
      >
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
    <div className="m-2 p-2 ">
      <label htmlFor="doc" className="mx-1 ">
        Document Format:
      </label>
      <select
        id="doc"
        value={Format}
        onChange={handleSelectChange}
        className="text-primary border-secondary rounded  border-2"
      >
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
    <div className="m-2 p-2 ">
      <label htmlFor="password" className="mx-1 text-base">
        Password:
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        value={password}
        onChange={handlePasswordChange}
        className="text-primary "
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="mx-1 p-1 hover:shadow-sm  border-secondary rounded  border-2 hover:text-tertiary "
      >
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
      let POST_URL =
        import.meta.env.VITE_BASE_URL + import.meta.env.VITE_SEND_PASTE;
      const response = await axios.post(POST_URL, configuration);

      if (response.status === 201) {
        console.log(response.data);
        toast.success(`Promise resolved 👌 ${response.data.slug}`, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        console.error(response);
        toast.error("Promise rejected 🤯");
      }
    } catch (error) {
      console.error("Error sending POST request:", error);
      toast.error("Promise rejected 🤯");
    }
  };

  return (
    <div className="m-2 p-2 ">
      <button
        onClick={handleClick}
        className="p-1 hover:shadow-sm  border-secondary rounded  border-2 hover:text-tertiary"
      >
        Send
      </button>
    </div>
  );
};
export const Header = () => {
  return (
    <>
      <div className="flex  justify-between  mxl-2 px-2  text-secondary bg-primary">
        <ExpiryTime></ExpiryTime>
        <DocFormat></DocFormat>
        <PasswordInput></PasswordInput>
        <SendButton />
        <ToastContainer
          position="top-right"
          autoClose={false}
          limit={1}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="dark"
          transition:Bounce
        />
      </div>
    </>
  );
};
