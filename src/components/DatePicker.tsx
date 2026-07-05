'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Brand-styled date picker for the booking form. Replaces the native
 * <input type="date"> whose popup cannot be themed. No external deps.
 */

const WEEKDAY_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

interface DatePickerProps {
  /** Selected date as YYYY-MM-DD, or '' when empty */
  value: string;
  onChange: (value: string) => void;
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

function toIso(year: number, monthIndex: number, day: number): string {
  return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
}

function todayIso(): string {
  const now = new Date();
  return toIso(now.getFullYear(), now.getMonth(), now.getDate());
}

function formatVi(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}

interface ViewMonth {
  year: number;
  monthIndex: number;
}

function viewFromIso(iso: string): ViewMonth {
  const [year, month] = iso.split('-').map(Number);
  return { year, monthIndex: month - 1 };
}

function shiftMonth(view: ViewMonth, delta: number): ViewMonth {
  const date = new Date(view.year, view.monthIndex + delta, 1);
  return { year: date.getFullYear(), monthIndex: date.getMonth() };
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<ViewMonth>(() => viewFromIso(value || todayIso()));
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  function toggleOpen() {
    if (!open) setView(viewFromIso(value || todayIso()));
    setOpen((previous) => !previous);
  }

  function selectDay(iso: string) {
    onChange(iso);
    setOpen(false);
  }

  const minIso = todayIso();
  // Monday-first offset of the month's first day
  const leadingBlanks = (new Date(view.year, view.monthIndex, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(view.year, view.monthIndex + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  return (
    <div className="dp-root" ref={rootRef}>
      <button
        type="button"
        className={`dp-trigger${value ? '' : ' dp-trigger--empty'}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggleOpen}
      >
        <span>{value ? formatVi(value) : 'Chọn ngày'}</span>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#B05F70" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="3" />
          <path d="M8 3v4M16 3v4M3 10h18" />
        </svg>
      </button>

      {open && (
        <div className="dp-popup" role="dialog" aria-label="Chọn ngày mong muốn">
          <div className="dp-header">
            <button type="button" className="dp-nav" aria-label="Tháng trước" onClick={() => setView((v) => shiftMonth(v, -1))}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <span className="dp-title">
              Tháng {view.monthIndex + 1}, {view.year}
            </span>
            <button type="button" className="dp-nav" aria-label="Tháng sau" onClick={() => setView((v) => shiftMonth(v, 1))}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
          <div className="dp-weekdays">
            {WEEKDAY_LABELS.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="dp-grid">
            {cells.map((day, index) => {
              if (day === null) return <span key={`blank-${index}`} />;
              const iso = toIso(view.year, view.monthIndex, day);
              const isDisabled = iso < minIso;
              const isSelected = iso === value;
              const isToday = iso === minIso;
              const classes = [
                'dp-day',
                isSelected ? 'dp-day--selected' : '',
                !isSelected && isToday ? 'dp-day--today' : '',
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <button key={iso} type="button" className={classes} disabled={isDisabled} onClick={() => selectDay(iso)}>
                  {day}
                </button>
              );
            })}
          </div>
          <div className="dp-footer">
            <button type="button" className="dp-action" onClick={() => selectDay('')}>
              Xoá
            </button>
            <button type="button" className="dp-action dp-action--strong" onClick={() => selectDay(minIso)}>
              Hôm nay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
