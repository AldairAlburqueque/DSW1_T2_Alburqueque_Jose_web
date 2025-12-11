
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BooksPage from './pages/BookPage';
import LoansPage from './pages/LoanPage';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />

        <Route path="/books" element={<BooksPage />} />
        <Route path="/loans" element={<LoansPage />} />
      </Routes>
    </Router>
  );
}

export default App;
