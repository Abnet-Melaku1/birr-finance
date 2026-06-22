import { boaParser } from './banks/boa';
import { cbeParser } from './banks/cbe';
import { mpesaParser } from './banks/mpesa';
import { telebirrParser } from './banks/telebirr';
import { ParsedSmsSchema } from './schema';
import type { BankParser, ParsedSms } from './types';

export const PARSERS: BankParser[] = [cbeParser, mpesaParser, telebirrParser, boaParser];

function validate(parsed: ParsedSms | null): ParsedSms | null {
  if (!parsed) return null;
  const result = ParsedSmsSchema.safeParse(parsed);
  return result.success ? result.data : null;
}

/**
 * Parse a transaction SMS. Prefers the parser mapped to `sender`; otherwise
 * tries each parser's content match. Returns null for non-transaction texts.
 */
export function parseSms(raw: string, sender?: string): ParsedSms | null {
  if (sender) {
    const lower = sender.toLowerCase();
    const bySender = PARSERS.find((p) => p.senderIds.some((id) => id.toLowerCase() === lower));
    if (bySender) return validate(bySender.parse(raw));
  }

  for (const parser of PARSERS) {
    if (parser.match(raw)) return validate(parser.parse(raw));
  }
  return null;
}
