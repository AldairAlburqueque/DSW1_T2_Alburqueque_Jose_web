import { useState, useEffect } from 'react';
import { bookService } from '../services/bookService';
import type { Book, CreateBook } from '../types';
import Message from '../components/Message';

import '../App.css';

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | '', text: string }>({ type: '', text: '' });

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const [formData, setFormData] = useState<CreateBook>({
    title: '',
    author: '',
    isbn: '',
    stock: 1,
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await bookService.getAll();
      setBooks(data);
    } catch {
      showMessage('error', 'Error al cargar libros');
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // manejar crear y editar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentId) {
        // actualización
        await bookService.update(currentId, formData);
        showMessage('success', 'Libro actualizado');
      } else {
        // creación
        await bookService.create(formData);
        showMessage('success', 'Libro creado');
      }

      clearForm();
      loadBooks();
    } catch (err: any) {
      showMessage('error', err.response?.data?.message || 'Error al guardar libro');
    }
  };


  // llenar formulario para editar
  const handleEdit = (book: Book) => {
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      stock: book.stock,
    });

    setCurrentId(book.id);
    setIsEditing(true);
  };


  // eliminar libro
  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este libro?')) return;

    try {
      await bookService.remove(id);
      showMessage('success', 'Libro eliminado');
      loadBooks();
    } catch {
      showMessage('error', 'Error al eliminar libro');
    }
  };

  const clearForm = () => {
    setFormData({ title: '', author: '', isbn: '', stock: 1 });
    setCurrentId(null);
    setIsEditing(false);
  };

  return (
    <div className="page">
      <h1>Libros</h1>
      <Message type={message.type} text={message.text} />

      <div className="form-section">
        <h3>{isEditing ? 'Editar Libro' : 'Nuevo Libro'}</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Autor</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>ISBN</label>
            <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input type="number" name="stock" min={1} value={formData.stock} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Actualizar' : 'Guardar'}
          </button>

          <button type="button" className="btn btn-secondary" onClick={clearForm}>
            Limpiar
          </button>
        </form>
      </div>

      {/* Tabla de libros */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>ISBN</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.stock}</td>
              <td>
                <button className="btn btn-info btn-small" onClick={() => handleEdit(book)}>
                  Editar
                </button>

                <button className="btn btn-danger btn-small" onClick={() => handleDelete(book.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {books.length === 0 && <p className="empty-message">No hay libros registrados</p>}
    </div>
  );
};

export default BooksPage;
