export interface TaskOptionsInterface {
  name: string;
  icon: string;
  handler(task: any);
}
