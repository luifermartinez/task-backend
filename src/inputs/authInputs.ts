/* Defining the type of the input for the login mutation. */
export interface LoginInput {
  email: string;
  password: string;
}

/* Defining the type of the input for the register mutation. */
export interface RegisterInput {
  email: string;
  name: string;
  password: string;
}
