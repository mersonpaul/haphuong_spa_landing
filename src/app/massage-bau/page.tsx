import { ServicePageScreen } from '@/components/ServicePageScreen';
import { buildServicePageMetadata } from '@/lib/servicePageMeta';
import { getServicePage } from '@/data/servicePages';

const page = getServicePage('massage-bau');

export const dynamic = 'force-static';
export const metadata = buildServicePageMetadata(page);

export default function MassageBauPage() {
  return <ServicePageScreen page={page} />;
}
