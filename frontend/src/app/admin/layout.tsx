


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header>
        <h1>Admin Panel</h1>
      </header>

      <main>{children}</main>
    </div>
  );
}
