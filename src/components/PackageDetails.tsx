'use client';

import { useRef } from 'react';
import { ChevronIcon } from '@/components/icons';
import type { CarePackage } from '@/data/packages';

/**
 * "Chi tiết liệu trình" opens a modal dialog instead of expanding the card
 * (the full step list is too long inline). The therapy steps live inside the
 * <dialog> in the server-rendered HTML, so crawlers still read them.
 */
export function PackageDetails({ pkg }: { pkg: CarePackage }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function open() {
    dialogRef.current?.showModal();
    document.body.style.overflow = 'hidden';
  }

  function close() {
    dialogRef.current?.close();
  }

  // Fires on every close path (X button, ESC, backdrop click) — unlock scroll
  function handleClose() {
    document.body.style.overflow = '';
  }

  // Close when the backdrop (the dialog element itself) is clicked
  function handleDialogClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) close();
  }

  return (
    <>
      <button type="button" className="pkg-details-btn" onClick={open}>
        Chi tiết liệu trình ({pkg.stepCount} bước)
        <ChevronIcon />
      </button>
      <dialog
        ref={dialogRef}
        className="pkg-dialog"
        onClick={handleDialogClick}
        onCancel={close}
        onClose={handleClose}
      >
        <div className="pkg-dialog__inner">
          <header className="pkg-dialog__head">
            <div>
              <h3 className="pkg-dialog__title">{pkg.name}</h3>
              <p className="pkg-dialog__meta">
                {pkg.sessionMinutes} phút / buổi · {pkg.therapyCount} liệu trình · {pkg.stepCount}{' '}
                bước trị liệu
              </p>
            </div>
            <button
              type="button"
              className="pkg-dialog__close"
              aria-label="Đóng chi tiết liệu trình"
              onClick={close}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </header>
          <div className="pkg-dialog__body">
            {pkg.therapies.map((therapy) => (
              <div key={therapy.title}>
                <h4>{therapy.title}</h4>
                <ol>
                  {therapy.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
            {pkg.effects.length > 0 && (
              <div>
                <h4>Hiệu quả liệu trình</h4>
                <ul>
                  {pkg.effects.map((effect) => (
                    <li key={effect}>{effect}</li>
                  ))}
                </ul>
              </div>
            )}
            {pkg.commitment && <p className="pkg-dialog__commit">{pkg.commitment}</p>}
            {pkg.gift && (
              <p className="pkg-dialog__gift">
                <strong>Quà tặng trong liệu trình:</strong> {pkg.gift}
              </p>
            )}
          </div>
          <footer className="pkg-dialog__foot">
            <a
              href={`?goi=${encodeURIComponent(pkg.name)}&nhom=${pkg.group}#dat-lich`}
              className="pkg-card__cta pkg-card__cta--solid"
              onClick={close}
            >
              Đặt gói này
            </a>
          </footer>
        </div>
      </dialog>
    </>
  );
}
