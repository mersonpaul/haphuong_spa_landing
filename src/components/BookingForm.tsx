'use client';

import { useState, type FormEvent } from 'react';
import { site } from '@/config/site';
import { bookingServiceOptions } from '@/data/services';
import { CheckIcon } from '@/components/icons';
import { DatePicker } from '@/components/DatePicker';

interface FormState {
  name: string;
  phone: string;
  service: string;
  date: string;
  note: string;
  /** Honeypot — humans never see or fill this field */
  website: string;
}

const initialForm: FormState = {
  name: '',
  phone: '',
  service: bookingServiceOptions[0],
  date: '',
  note: '',
  website: '',
};

type ErrorKind = null | 'validation' | 'api';

export function BookingForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<ErrorKind>(null);

  const setField = (field: keyof FormState) => (value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setError(null);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Only the phone number is required — the spa calls back to confirm details.
    if (!form.phone.trim()) {
      setError('validation');
      return;
    }
    setSending(true);
    setError(null);
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const payload = (await response.json().catch(() => null)) as { ok?: boolean } | null;
      if (response.ok && payload?.ok) {
        setSent(true);
      } else {
        setError('api');
      }
    } catch {
      setError('api');
    } finally {
      setSending(false);
    }
  }

  function handleReset() {
    setForm((previous) => ({ ...previous, date: '', note: '' }));
    setSent(false);
    setError(null);
  }

  if (sent) {
    const dateText = form.date ? ` vào ngày ${form.date.split('-').reverse().join('/')}` : '';
    return (
      <div className="booking-card">
        <div className="booking-success">
          <span className="booking-success__icon">
            <CheckIcon />
          </span>
          <h2>Đã nhận yêu cầu!</h2>
          <p>
            Cảm ơn mẹ{form.name.trim() ? ` ${form.name.trim()}` : ''}. Hà Phương sẽ gọi số{' '}
            <strong>{form.phone}</strong> trong 15 phút để xác nhận lịch{' '}
            <strong>{form.service}</strong>
            {dateText}.
          </p>
          <button type="button" onClick={handleReset} className="booking-success__again">
            Đặt thêm lịch khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-card">
      <h2 className="booking-card__title">Đặt lịch hẹn</h2>
      <p className="booking-card__sub">Để lại thông tin, chúng tôi gọi lại xác nhận trong 15 phút.</p>
      <form onSubmit={handleSubmit} className="booking-form" noValidate>
        <label>
          <span>
            Số điện thoại <span className="req">*</span>
          </span>
          <input
            name="phone"
            value={form.phone}
            onChange={(event) => setField('phone')(event.target.value)}
            placeholder="09xx xxx xxx"
            type="tel"
            autoComplete="tel"
          />
        </label>
        <label>
          Họ tên mẹ
          <input
            name="name"
            value={form.name}
            onChange={(event) => setField('name')(event.target.value)}
            placeholder="Nguyễn Thu Trang"
            autoComplete="name"
          />
        </label>
        <label>
          Dịch vụ
          <select name="service" value={form.service} onChange={(event) => setField('service')(event.target.value)}>
            {bookingServiceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ngày mong muốn
          <DatePicker value={form.date} onChange={setField('date')} />
        </label>
        <label className="span-2">
          Ghi chú
          <textarea
            name="note"
            value={form.note}
            onChange={(event) => setField('note')(event.target.value)}
            rows={3}
            placeholder="Ví dụ: bé 3 tháng, muốn làm tại nhà buổi sáng..."
          />
        </label>
        {/* Honeypot field for spam bots — hidden from real users */}
        <div className="hp-field" aria-hidden="true">
          <label>
            Website
            <input
              name="website"
              value={form.website}
              onChange={(event) => setField('website')(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>
        {error === 'validation' && (
          <p className="booking-form__error">
            Vui lòng nhập số điện thoại để spa gọi lại xác nhận.
          </p>
        )}
        {error === 'api' && (
          <p className="booking-form__error">
            Chưa gửi được yêu cầu — mẹ vui lòng thử lại hoặc gọi hotline {site.hotline}.
          </p>
        )}
        <button type="submit" className="btn-primary booking-form__submit" disabled={sending}>
          {sending ? 'Đang gửi...' : 'Gửi yêu cầu đặt lịch'}
        </button>
      </form>
    </div>
  );
}
