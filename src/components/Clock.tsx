'use client';

import { useEffect, useState } from 'react';
import { site } from '@/content/site';

export default function Clock({ prefix, locale }: { prefix?: string; locale: string }) {
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', timeZone: site.timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, [locale]);

  return (
    <span suppressHydrationWarning>
      {prefix ? `${prefix} · ` : ''}
      {time}
    </span>
  );
}
