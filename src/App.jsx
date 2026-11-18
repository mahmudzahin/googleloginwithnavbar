import Navbar from "./navbar/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<h1>Landing Page</h1>} />
        <Route path="/home" element={<h1>Welcome Home!</h1>} />
      </Routes>
    </>
  );
}

export default App;