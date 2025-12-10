import { useState, useEffect } from 'react';
import { loanService } from '../services/loanService';
import { bookService } from '../services/bookService';
import type { Loan, CreateLoan, Book } from '../types';
import Message from '../components/Message';

const LoansPage = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [formData, setFormData] = useState<CreateLoan>({
    bookId: 0,
    studentName: '',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error' | '', text: string }>({ type: '', text: '' });

  useEffect(() => {
    loadLoans();
    loadBooks();
  }, []);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const loadLoans = async () => {
    try {
      const data = await loanService.getAll();
      setLoans(data);
    } catch {
      showMessage('error', 'Error al cargar préstamos');
    }
  };

  const loadBooks = async () => {
    try {
      const data = await bookService.getAll();
      setBooks(data);
    } catch {
      showMessage('error', 'Error al cargar libros');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loanService.create(formData);
      showMessage('success', 'Préstamo registrado');
      setFormData({ bookId: 0, studentName: '' });
      loadLoans();
      loadBooks();
    } catch (err: any) {
      showMessage('error', err.response?.data?.message || 'Error al registrar préstamo');
    }
  };

  const handleReturn = async (id: number) => {
    try {
      await loanService.returnLoan(id);
      showMessage('success', 'Préstamo devuelto');
      loadLoans();
      loadBooks();
    } catch (err: any) {
      showMessage('error', err.response?.data?.message || 'Error al devolver préstamo');
    }
  };

  return (
    <div className="page">
      <h1>Préstamos</h1>
      <Message type={message.type} text={message.text} />

      <div className="form-section">
        <h3>Nuevo Préstamo</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Libro</label>
            <select name="bookId" value={formData.bookId} onChange={handleChange} required>
              <option value={0}>Seleccione un libro</option>
              {books.filter(b => b.stock > 0).map(book => (
                <option key={book.id} value={book.id}>
                  {book.title} - Stock: {book.stock}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Nombre del estudiante</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Registrar Préstamo</button>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Libro</th>
            <th>Estudiante</th>
            <th>Fecha préstamo</th>
            <th>Fecha devolución</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr key={loan.id}>
              <td>{loan.id}</td>
              <td>{books.find(b => b.id === loan.bookId)?.title || 'Desconocido'}</td>
              <td>{loan.studentName}</td>
              <td>{new Date(loan.loanDate).toLocaleDateString()}</td>
              <td>{loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : '-'}</td>
              <td>{loan.status}</td>
              <td>
                {loan.status === 'Active' && (
                  <button className="btn btn-success btn-small" onClick={() => handleReturn(loan.id)}>
                    Devolver
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loans.length === 0 && <p className="empty-message">No hay préstamos registrados</p>}
    </div>
  );
};

export default LoansPage;
