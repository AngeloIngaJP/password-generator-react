import { MdOutlineCopyAll, MdCheck } from "react-icons/md";
import { IoReload } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { checkboxs } from "./Checkboxs";

function App() {
  const [lengthSlider, setLengthSlider] = useState(15);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState(false);
  const ref = useRef(null);
  const refArray = useRef([]);

  const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
  };

  const changeLength = (e) => {
    setLengthSlider(e.target.value);
  };

  const copyPassword = () => {
    setCopy(true);
    navigator.clipboard.writeText(password);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };

  const generatePassword = () => {
    let staticPassword = "",
      randomPassword = "",
      excludeDuplicate = false;

    refArray.current?.forEach((option) => {
      if (option.checked) {
        if (option.id !== "exc-duplicate" && option.id !== "spaces") {
          staticPassword += characters[option.id];
        } else if (option.id === "spaces") {
          staticPassword = `  ${staticPassword}  `;
        } else {
          excludeDuplicate = true;
        }
      }
    });

    for (let i = 0; i < lengthSlider; i++) {
      let randomChar =
        staticPassword[Math.floor(Math.random() * staticPassword.length)];

      if (excludeDuplicate) {
        !randomPassword.includes(randomChar) || randomChar === " "
          ? (randomPassword += randomChar)
          : i--;
      } else {
        randomPassword += randomChar;
      }
    }

    setPassword(randomPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [lengthSlider]);

  useEffect(() => {
    ref.current.id =
      lengthSlider <= 8
        ? "weak"
        : lengthSlider <= 16
        ? "medium"
        : lengthSlider <= 24
        ? "strong"
        : "verystrong";
  }, [ref, lengthSlider]);

  return (
    <div className="App">
      <div className="container">
        <h2>Password Generator</h2>
        <div className="wrapper">
          <div className="input-box">
            <input type="text" value={password} disabled />
            <span className="input-icon">
              <span>
                {copy ? (
                  <MdCheck size={24} fill="#00a878" />
                ) : (
                  <MdOutlineCopyAll size={24} onClick={copyPassword} />
                )}
              </span>
            </span>
            <span className="input-icon reload">
              <span>
                <IoReload
                  size={24}
                  onClick={generatePassword}
                  className="reload"
                />
              </span>
            </span>
          </div>
          <div className="pass-indicator" ref={ref}></div>
          <div className="pass-length">
            <div className="details">
              <label className="title">Password Length</label>
              <span>{lengthSlider}</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={lengthSlider}
              onChange={changeLength}
            />
          </div>
          <div className="pass-settings">
            <label className="title">Password Settings</label>
            <ul className="options">
              {checkboxs.map((checkbox, i) => (
                <li className="option" key={checkbox.id}>
                  <input
                    ref={(el) => (refArray.current[i] = el)}
                    type="checkbox"
                    id={checkbox.id}
                    defaultChecked={checkbox.id === "lowercase" ? true : false}
                    onChange={generatePassword}
                  />
                  <label htmlFor={checkbox.id}>{checkbox.description}</label>
                </li>
              ))}
            </ul>
          </div>
          <button className="generate-btn" onClick={generatePassword}>
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
