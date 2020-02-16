export interface TaskInterface {
  name: string;
  id?: number;
  description: string;
  updated_at?: string;
  created_at?: string;
  status?: {
    name: string;
  };
}
