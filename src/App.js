import logo from "./logo.svg";
import "./App.css";

import GoogleMapDistances from "./components/features/GoogleMapDistances/GoogleMapDistances";
import formatAddress from "./helpers/formatAddress";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GoogleMapDistances />
      </header>
    </div>
  );
}

export default App;
