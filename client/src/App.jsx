import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <main className="app transition-all ease-in">
        <Home />
        <Canvas />
        <Customizer />
      </main>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default App;
