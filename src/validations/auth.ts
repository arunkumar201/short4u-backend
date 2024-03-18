import * as z from 'zod';
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const userSchema = z.object({
  body: z.object({
    name: z.string().min(4, {
      message: 'Name must be at least 4 characters',
    }),
    email: z.string().email({
      message: 'Email must be a valid email',
    }),
    last_login: z.string({
      required_error: 'Last login must be a string',
    }),
    password: z
      .string()
      .min(6, {
        message:
          'Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character and minimum 6 characters',
      })
      .regex(passwordRegex),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email({
      message: 'Email must be a valid email',
    }),
    password: z
      .string()
      .min(6, {
        message:
          'Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character and minimum 6 characters',
      })
      .regex(passwordRegex),
  }),
});

export const userEmailSchema= z.object({
  params: z.object({
    email: z.string().email({
      message: 'email must be a valid email',
    }),
  }),
});
