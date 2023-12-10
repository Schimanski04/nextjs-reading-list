export interface Book {
  id: number;
  title: string;
  author: string;
  status: "IVE_READ" | "IAM_READING" | "I_WANT_TO_READ";
}
