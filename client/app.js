import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/2fa-verify" element={<>Verify</>} />
    </Routes>
  );
};

export default App;
