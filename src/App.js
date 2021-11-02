import "./App.css";
import OLMap from "./OLMap";

function App() {
  return (
    <div className="App">
      <a href="https://www.teararoa.org.nz/" className="logo-wrapper">
        <img src="ta_logo.png" alt="Te Araroa Logo" className="logo"></img>
      </a>
      <OLMap></OLMap>
    </div>
  );
}

export default App;
