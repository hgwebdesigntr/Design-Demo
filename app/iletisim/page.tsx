'use client';

import { useState } from 'react';

export default function Iletisim() {
  const [form, setForm] = useState({ ad: '', email: '', telefon: '', konu: '', mesaj: '' });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      {/* Banner */}
      <section className="relative h-72 bg-[#1B3A4B] flex items-end pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-12 w-full">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C4622D] mb-3">Bize Ulaşın</p>
          <h1 className="font-serif text-5xl text-white">İletişim</h1>
        </div>
      </section>

      <section className="bg-[#F5F0E8] py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Bilgiler */}
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C4622D] mb-6">İletişim Bilgileri</p>
            <h2 className="font-serif text-4xl text-[#1B3A4B] mb-10 leading-[1.2]">
              Hayalinizi
              <br />
              <em className="italic">Dinlemeye Hazırız.</em>
            </h2>

            <div className="space-y-8">
              {[
                { label: 'Telefon', value: '+90 5XX XXX XX XX' },
                { label: 'E-posta', value: 'info@armeldesign.com' },
                { label: 'Adres', value: 'İstanbul, Türkiye' },
                { label: 'Instagram', value: '@armeldesign' },
              ].map((c) => (
                <div key={c.label} className="border-b border-[#D4C5A9] pb-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#2C2C2C]/40 mb-1">{c.label}</p>
                  <p className="text-[#1B3A4B] font-serif text-xl">{c.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C4622D] mb-6">Mesaj Gönderin</p>

            {sent ? (
              <div className="bg-[#6B7F6E]/20 border border-[#6B7F6E] p-8 text-center">
                <p className="font-serif text-2xl text-[#1B3A4B] mb-2">Mesajınız Alındı</p>
                <p className="text-[#2C2C2C]/60 text-sm">En kısa sürede size geri döneceğiz.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[#2C2C2C]/50 mb-2">Ad Soyad *</label>
                    <input
                      type="text"
                      name="ad"
                      required
                      value={form.ad}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-[#D4C5A9] px-4 py-3 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#1B3A4B] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[#2C2C2C]/50 mb-2">E-posta *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-[#D4C5A9] px-4 py-3 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#1B3A4B] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#2C2C2C]/50 mb-2">Telefon</label>
                  <input
                    type="tel"
                    name="telefon"
                    value={form.telefon}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-[#D4C5A9] px-4 py-3 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#1B3A4B] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#2C2C2C]/50 mb-2">Konu</label>
                  <select
                    name="konu"
                    value={form.konu}
                    onChange={handleChange}
                    className="w-full bg-[#F5F0E8] border border-[#D4C5A9] px-4 py-3 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#1B3A4B] transition-colors"
                  >
                    <option value="">Seçiniz</option>
                    <option>İç Mimari Tasarım</option>
                    <option>Konsept Geliştirme</option>
                    <option>Uygulama & Koordinasyon</option>
                    <option>Tadilat & Yenileme</option>
                    <option>Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#2C2C2C]/50 mb-2">Mesajınız *</label>
                  <textarea
                    name="mesaj"
                    required
                    rows={5}
                    value={form.mesaj}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-[#D4C5A9] px-4 py-3 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#1B3A4B] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C4622D] text-white text-[10px] tracking-[0.3em] uppercase py-4 hover:bg-[#a8522a] transition-colors"
                >
                  Gönder &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
