import { object, string, TypeOf } from "zod";

export const signInSchema = object({
  email: string().email('Not Valid Email').min(1, 'Email is Required'),
  password: string().min(6, 'Password too Short - Should be 6 chars minimum')
})

export const signUpSchema = object({
  email: string().email('Not Valid Email').min(1, 'Email is Required'),
  name: string().min(1, 'Name is required'),
  password: string().min(6, 'Password too Short - Should be 6 chars minimum'),
  passwordConfirmation: string().min(6, 'Password too Short - Should be 6 chars minimum'),
}).refine((data) =>  data.password === data.passwordConfirmation, {
  message: 'Passwords do not Match',
  path: ["passwordConfirmation"]
})

export type SignInType = TypeOf<typeof signInSchema>
export type SignUpType = TypeOf<typeof signUpSchema>