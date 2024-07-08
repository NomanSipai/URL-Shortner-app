import { Route, Routes } from "react-router-dom";
import Searchbar from "./components/Searchbar";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <div className="container px-4 mx-auto">
      <Toaster position="top-center" reverseOrder={true} />
      <Routes>
        <Route path="/" element={<Searchbar />} />
        {/* <Route path="/qrcode" element={<Qrcode qrCode={qrCode} />} /> */}
      </Routes>
    </div>
  );
}

export default App;
