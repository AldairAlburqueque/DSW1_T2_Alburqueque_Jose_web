import api from './api';
import type { Book, CreateBook } from '../types';

export const bookService = {
  getAll: async (): Promise<Book[]> => {
    const response = await api.get('/books');
    return response.data;
  },

  getById: async (id: number): Promise<Book> => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  create: async (data: CreateBook): Promise<Book> => {
    const response = await api.post('/books', data);
    return response.data;
  },

  // Ejemplo de método extra que podrías agregar luego
  // update: async (id: number, data: UpdateBookDto): Promise<Book> => { ... },
  // delete: async (id: number): Promise<void> => { ... },
};

