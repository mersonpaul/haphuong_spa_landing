import { BookingForm } from '@/components/BookingForm';
import { ContactPanel } from '@/components/ContactPanel';

interface BookingSectionProps {
  /** Preselects the service <select> - used by the standalone service pages */
  defaultService?: string;
}

export function BookingSection({ defaultService }: BookingSectionProps) {
  return (
    <section id="dat-lich" className="booking">
      <div className="booking__inner">
        <BookingForm defaultService={defaultService} />
        <ContactPanel />
      </div>
    </section>
  );
}
