import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Documentation Center</title>
        <link rel='icon' href='/vsd_logo.png' className='h-10 w-10' />
      </head>
      <body className=''>{children}</body>
    </html>
  );
}
