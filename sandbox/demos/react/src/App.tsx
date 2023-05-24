import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  return (
    <div>
      <h1>Hello, world!</h1>
      <p>Test component for vite</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
