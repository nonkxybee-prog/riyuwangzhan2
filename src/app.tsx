import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import FiftySoundsPractice from "@/pages/FiftySoundsPractice";
import VocabularyPractice from "@/pages/VocabularyPractice";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fifty-sounds" element={<FiftySoundsPractice />} />
        <Route path="/vocabulary" element={<VocabularyPractice />} />
      </Routes>
    </AuthContext.Provider>
  );
}
