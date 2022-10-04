import { MdOutlineCopyAll } from "react-icons/md";
import { IoReload } from "react-icons/io5";

function App() {
  const checkboxs = [
    { id: "lowercase", description: "Lowercase (a-z)" },
    {
      id: "uppercase",
      description: "Uppercase (A-Z)"
    },
    {
      id: "numbers",
      description: "Numbers (0-9)"
    },
    {
      id: "symbols",
      description: "Symbols (!-$^+)"
    },
    {
      id: "exc-duplicate",
      description: "Exclude Duplicate"
    },
    {
      id: "spaces",
      description: "Include Spaces"
    }
  ];
  return (
    <div className="App">
      <div className="container">
        <h2>Password Generator</h2>
        <div className="wrapper">
          <div className="input-box">
            <input type="text" value="raaaaa" disabled />
            <span className="input-icon">
              <span>
                <MdOutlineCopyAll size={24} />
              </span>
            </span>
            <span className="input-icon reload">
              <span>
                <IoReload size={24} />
              </span>
            </span>
          </div>
          <div className="pass-indicator"></div>
          <div className="pass-length">
            <div className="details">
              <label className="title">Password Length</label>
              <span>15</span>
            </div>
            <input type="range" min="1" max="30" step="1" />
          </div>
          <div className="pass-settings">
            <label className="title">Password Settings</label>
            <ul className="options">
              {checkboxs.map((checkbox) => (
                <li className="option" key={checkbox.id}>
                  <input type="checkbox" id={checkbox.id} />
                  <label htmlFor={checkbox.id}>{checkbox.description}</label>
                </li>
              ))}
            </ul>
          </div>
          <button className="generate-btn">Generate Password</button>
        </div>
      </div>
    </div>
  );
}

export default App;
