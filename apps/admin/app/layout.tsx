import "./globals.css";

export const metadata = {
  title: "Possible CMS",
  description: "Post-handover content management for AI-delivered websites.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
