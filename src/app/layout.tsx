import "./globals.css";

/*

Table of Content:

- The number of students for each subjects 

- The bar graph of the numbers of scores for each subjects

*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
