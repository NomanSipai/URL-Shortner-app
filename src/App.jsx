import Searchbar from "./components/Searchbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="container px-4 mx-auto">
      <Toaster position="top-center" reverseOrder={true} />
      <Searchbar />
    </div>
  );
}

export default App;
