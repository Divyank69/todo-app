export type TodoItem = {
  id: number,
  title: string,
  status: boolean,
  deadline?: string,
  category: 'Inbox' | 'Work' | 'Shopping' | 'Family' | 'Personal';
}