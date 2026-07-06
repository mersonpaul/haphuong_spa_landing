import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { PackagesTeaser } from '@/components/PackagesTeaser';
import { WhyUs } from '@/components/WhyUs';
import { Testimonials } from '@/components/Testimonials';
import { Faq } from '@/components/Faq';
import { BookingSection } from '@/components/BookingSection';
import { Footer } from '@/components/Footer';
import { FloatingContacts } from '@/components/FloatingContacts';
import { localBusinessJsonLd, faqPageJsonLd, jsonLdString } from '@/lib/jsonld';

// Fully static page — all content (prices, FAQ, NAP, JSON-LD) is in the
// server-rendered HTML for SEO/GEO. Only the booking form runs client JS.
export const dynamic = 'force-static';

export const metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(localBusinessJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(faqPageJsonLd()) }}
      />
      <Header />
      <main>
        <Hero />
        <Services />
        <PackagesTeaser />
        <WhyUs />
        <Testimonials />
        <Faq />
        <BookingSection />
      </main>
      <Footer />
      <FloatingContacts />
    </>
  );
}
