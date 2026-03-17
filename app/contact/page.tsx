'use client';

import { useState, FormEvent } from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xxxxxxxx';

    try {
      await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-article mx-auto px-4 py-20 text-center">
        <h1 className="text-primary">送信完了</h1>
        <p className="mt-4 text-text-muted">お問い合わせありがとうございます。内容を確認の上、ご返信いたします。</p>
      </div>
    );
  }

  return (
    <div className="max-w-article mx-auto px-4">
      <Breadcrumb items={[{ label: 'お問い合わせ' }]} />

      <section className="py-8">
        <h1>お問い合わせ</h1>
        <p className="mt-2 text-text-muted">ご質問・ご相談はこちらからお気軽にどうぞ。</p>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6 pb-12">
        <div>
          <label htmlFor="name" className="block text-body-sm font-bold text-text mb-1">
            お名前 <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-body-sm font-bold text-text mb-1">
            メールアドレス <span className="text-accent">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-body-sm font-bold text-text mb-1">
            会社名
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-body-sm font-bold text-text mb-1">
            お問い合わせ種別
          </label>
          <select
            id="type"
            name="type"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="other">その他</option>
            <option value="advertising">広告掲載について</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-body-sm font-bold text-text mb-1">
            お問い合わせ内容 <span className="text-accent">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="px-8 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-bold"
        >
          送信する
        </button>
      </form>
    </div>
  );
}
