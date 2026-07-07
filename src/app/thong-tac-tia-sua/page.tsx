import { ServicePageScreen } from '@/components/ServicePageScreen';
import { buildServicePageMetadata } from '@/lib/servicePageMeta';
import { getServicePage } from '@/data/servicePages';

const page = getServicePage('thong-tac-tia-sua');

export const dynamic = 'force-static';
export const metadata = buildServicePageMetadata(page);

export default function ThongTacTiaSuaPage() {
  return <ServicePageScreen page={page} />;
}
