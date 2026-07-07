import { ServicePageScreen } from '@/components/ServicePageScreen';
import { buildServicePageMetadata } from '@/lib/servicePageMeta';
import { getServicePage } from '@/data/servicePages';

const page = getServicePage('boi-thuy-lieu-cho-be');

export const dynamic = 'force-static';
export const metadata = buildServicePageMetadata(page);

export default function BoiThuyLieuPage() {
  return <ServicePageScreen page={page} />;
}
