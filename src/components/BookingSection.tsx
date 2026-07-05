import { BookingForm } from '@/components/BookingForm';
import { ContactPanel } from '@/components/ContactPanel';

export function BookingSection() {
  return (
    <section id="dat-lich" className="booking">
      <div className="booking__inner">
        <BookingForm />
        <ContactPanel />
      </div>
    </section>
  );
}
