export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  stock: number;
  createdAt: string;
}

export interface CreateBook {
  title: string;
  author: string;
  isbn: string;
  stock: number;
}

export interface Loan {
  id: number;
  bookId: number;
  studentName: string;
  loanDate: string;
  returnDate?: string | null;
  status: string;
}

export interface CreateLoan {
  bookId: number;
  studentName: string;
}
