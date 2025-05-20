import { z } from 'zod';

export const personalSchema = z
  .object({
    firstName: z.string().nonempty('First name is required'),
    lastName:  z.string().nonempty('Last name is required'),
    email:     z.string().email('Invalid email'),
    employmentStatus: z.enum(['Employed','Self-Employed','Unemployed']),
    employerName:     z.string().optional(),
  })
  .refine(
    data =>
      data.employmentStatus !== 'Employed' ||
      !!data.employerName?.trim(),
    { message: 'Employer name is required when employed', path: ['employerName'] }
  );

export const loanSchema = z.object({
  loanPurpose: z.string().nonempty('Loan purpose is required'),
  amount:      z.number().min(2000, 'Minimum amount is $2000'),
  deposit: z
    .number()
    .min(0, 'Minimum deposit is $0'),
  term: z.number().min(1, 'Min 1 year').max(7, 'Max 7 years'),
}).refine(
  (data: { amount: number; deposit: number }) => data.deposit <= data.amount,
  { message: 'Deposit must not exceed amount', path: ['deposit'] }
);
