export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Success<T> {
  success: true;
  message: string;
  data: T;
}

interface Failure {
  success: false;
  message: string;
  data: null;
}

export type Response<D> = Success<D> | Failure;

export interface User {
  id: string;
  username: string;
  name: string;
}