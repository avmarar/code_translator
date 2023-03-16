import React from "react";

import Copy from "./icons/Copy";
import Delete from "./icons/Delete";

const App = () => {
  const handleSubmit = () => {
    console.log("Convert Button Clicked");
  };
  return (
    <main className="app">
      <header className="header__container">
        <div className="header">
          <h3>Source</h3>
          <div className="header__right">
            <button className="runBtn" onClick={handleSubmit}>
              Convert
            </button>
            <Delete />
          </div>
        </div>

        <div className="header">
          <h3>Target</h3>
          <div className="header__right">
            <Copy />
          </div>
        </div>
      </header>
      <div className="code__container"></div>
    </main>
  );
};

export default App;
