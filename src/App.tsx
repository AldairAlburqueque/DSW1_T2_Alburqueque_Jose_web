import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BooksPage from './pages/BookPage';
import LoansPage from './pages/LoanPage';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/books" element={<BooksPage />} />
        <Route path="/loans" element={<LoansPage />} />
      </Routes>
    </Router>
  );
};

export default App;
