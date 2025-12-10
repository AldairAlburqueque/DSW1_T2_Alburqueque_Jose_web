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

  update: async (id: number, data: CreateBook): Promise<Book> => {
    const response = await api.put(`/books/${id}`, data);
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/books/${id}`);
  },
};
