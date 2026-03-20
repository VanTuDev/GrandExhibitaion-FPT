import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FPT FUDA · Grand Exhibition',
  description: 'Grand Exhibition FPT FUDA  — Triển lãm câu lạc bộ FPT University Đà Nẵng',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
