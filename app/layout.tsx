import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClerkProviderWrapper from "@/components/ClerkProviderWrapper";
import { CartProvider } from "@/components/CartContext";
import { UserProvider } from "@/components/UserContext";
import { DeliveryProvider } from "@/components/DeliveryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FastFood Delivery - Order Food Online",
  description: "Order your favorite food online. Fast delivery, great prices, and delicious meals from top restaurants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <ClerkProviderWrapper>
          <CartProvider>
            <UserProvider>
              <DeliveryProvider>
                {children}
              </DeliveryProvider>
            </UserProvider>
          </CartProvider>
        </ClerkProviderWrapper>
      </body>
    </html>
  );
}
