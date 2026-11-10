import Home from '@/components/Home';
import { dictionaries } from '@/content/dictionaries';

export default function Page() {
  return <Home t={dictionaries.en} />;
}
