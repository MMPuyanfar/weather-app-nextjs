'use client'

// import type { Metadata } from "next";
import "./globals.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "react-query";


// export const metadata: Metadata = {
//   title: "Weather App",
//   description: "See your city weather condition alongside a 7-days forecast",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
