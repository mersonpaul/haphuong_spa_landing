import { ServicePageScreen } from '@/components/ServicePageScreen';
import { buildServicePageMetadata } from '@/lib/servicePageMeta';
import { getServicePage } from '@/data/servicePages';

const page = getServicePage('tam-be');

export const dynamic = 'force-static';
export const metadata = buildServicePageMetadata(page);

export default function TamBePage() {
  return <ServicePageScreen page={page} />;
}
