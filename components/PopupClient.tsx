'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import styles from './PopupClient.module.css';

const STORAGE_KEY = 'armel_popup_dismissed';

interface PopupData {
  active: boolean;
  bgImage?: { asset: { url: string } };
  tag?: string;
  heading?: string;
  subheading?: string;
  delaySeconds?: number;
  showAfterClose?: boolean;
  showOnAllPages?: boolean;
}

interface SiteData {
  phone?: string;
  email?: string;
  address?: string;
  instagram?: string;
  linkedin?: string;
  pinterest?: string;
}

export default function PopupClient({
  popup,
  site,
}: {
  popup: PopupData | null;
  site: SiteData | null;
}) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!popup?.active) return;
    if (!popup.showOnAllPages && pathname !== '/') return;
    if (!popup.showAfterClose && localStorage.getItem(STORAGE_KEY)) return;

    const delay = (popup.delaySeconds ?? 2) * 1000;
    const timer = setTimeout(() => {
      setShow(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [popup, pathname]);

  /* Dışarıdan (örn. StatsSection CTA) popup açma isteği */
  useEffect(() => {
    const openPopup = () => {
      setShow(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    };
    window.addEventListener('armel:open-popup', openPopup);
    return () => window.removeEventListener('armel:open-popup', openPopup);
  }, []);

  const handleClose = useCallback(() => {
    setAnimate(false);
    setTimeout(() => setShow(false), 300);
    if (!popup?.showAfterClose) {
      localStorage.setItem(STORAGE_KEY, '1');
    }
  }, [popup]);

  if (!show) return null;

  const bgUrl = popup?.bgImage?.asset?.url;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${styles.backdrop} ${animate ? styles.backdropVisible : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl ${styles.modal} ${animate ? styles.modalVisible : ''}`}
        style={{
          background: bgUrl
            ? `linear-gradient(160deg, rgba(27,55,43,0.92) 0%, rgba(36,68,54,0.85) 100%), url(${bgUrl}) center/cover no-repeat`
            : 'linear-gradient(160deg, #1B372B 0%, #244436 100%)',
        }}
      >
        {/* Kapat butonu */}
        <button
          onClick={handleClose}
          aria-label="Kapat"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all z-10"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M13.7 0.3a1 1 0 0 0-1.4 0L7 5.6 1.7.3A1 1 0 0 0 .3 1.7L5.6 7 .3 12.3a1 1 0 0 0 1.4 1.4L7 8.4l5.3 5.3a1 1 0 0 0 1.4-1.4L8.4 7l5.3-5.3a1 1 0 0 0 0-1.4z" />
          </svg>
        </button>

        <div className="p-8 pt-10">
          {/* Etiket */}
          {popup?.tag && (
            <p className="text-xs tracking-[0.2em] uppercase text-white/50 mb-5">
              — {popup.tag}
            </p>
          )}

          {/* Ana Başlık */}
          {popup?.heading && (
            <h2 className={styles.popupHeading}>{popup.heading}</h2>
          )}

          {/* Alt Başlık */}
          {popup?.subheading && (
            <p className="text-white/65 text-sm leading-relaxed mb-7">
              {popup.subheading}
            </p>
          )}

          {/* İletişim Bilgileri */}
          {(site?.address || site?.phone || site?.email) && (
            <div className="border-t border-white/15 pt-6 space-y-3.5 mb-6">
              {site?.address && (
                <div className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 text-white/40 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-white/75 text-sm">{site.address}</span>
                </div>
              )}
              {site?.phone && (
                <div className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 text-white/40 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href={`tel:${site.phone}`}
                    className="text-white/75 text-sm hover:text-white transition-colors"
                  >
                    {site.phone}
                  </a>
                </div>
              )}
              {site?.email && (
                <div className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 text-white/40 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-white/75 text-sm hover:text-white transition-colors"
                  >
                    {site.email}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Sosyal Medya */}
          {(site?.instagram || site?.linkedin || site?.pinterest) && (
            <div className="flex gap-2.5">
              {site?.instagram && (
                <a
                  href={`https://instagram.com/${site.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {site?.linkedin && (
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
              {site?.pinterest && (
                <a
                  href={site.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
