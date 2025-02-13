import { Route, Routes } from "react-router-dom";
import Searchbar from "./components/Searchbar";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <div className="container flex items-center justify-center min-h-screen mx-auto px-4">
      <Toaster position="top-center" reverseOrder={true} />
      <Routes>
        <Route path="/" element={<Searchbar />} />
        {/* <Route path="/qrcode" element={<Qrcode qrCode={qrCode} />} /> */}
      </Routes>
    </div>
  );
}

export default App;
