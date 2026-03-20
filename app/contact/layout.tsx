import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'お問い合わせ',
  description: 'Reboot Hubへのお問い合わせはこちらから。',
  path: '/contact/',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
