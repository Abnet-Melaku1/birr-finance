import { useEffect } from 'react';

import { categorize } from '@/lib/categorize';
import { nowTime, todayDay } from '@/lib/clock';
import { nextId } from '@/lib/id';
import { parseSms } from '@/lib/parser';
import { useAccounts, useAddTransaction } from '@/store';

import { subscribeToSms } from './SmsListener';

/**
 * On-device capture pipeline: native SMS → parse → categorize → store.
 * No network anywhere. A no-op when the native receiver isn't present.
 */
export function useSmsCapture() {
  const addTransaction = useAddTransaction();
  const accounts = useAccounts();

  useEffect(() => {
    return subscribeToSms(({ sender, body }) => {
      const parsed = parseSms(body, sender);
      if (!parsed) return;

      const account = accounts.find((a) => a.bank === parsed.bank) ?? accounts[0];
      addTransaction({
        id: nextId('sms'),
        d: todayDay(),
        t: nowTime(),
        dir: parsed.dir,
        amount: parsed.amount,
        cat: categorize(parsed.merchant),
        acct: account?.id ?? '',
        merchant: parsed.merchant,
        parsed: true,
        bank: parsed.bank,
        raw: body,
      });
    });
  }, [addTransaction, accounts]);
}
