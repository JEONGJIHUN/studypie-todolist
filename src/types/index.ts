export type Todo = {
  date: string;
  title: string;
  id: string;
  completed: boolean;
  completedTime: Date;
};

export type Todos = Todo[];
