import { z } from 'zod';

export const ParsedSmsSchema = z.object({
  bank: z.enum(['cbe', 'boa', 'telebirr', 'mpesa', 'awash', 'cbebirr']),
  acct: z.string().optional(),
  dir: z.enum(['in', 'out']),
  amount: z.number().int().nonnegative(),
  merchant: z.string().min(1),
  balance: z.number().int().optional(),
  ref: z.string().optional(),
  at: z.string().optional(),
  raw: z.string().min(1),
});
