import Header from "@/components/Header";
import TextPrompt from "@/components/TextPrompt";
import "./globals.css";

export const metadata = {
  title: "Image Gen",
  description: "powered by DALL &#x2022 E and chatGPT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* HEADER */}
        <Header />
        {/* Prompt */}
        <TextPrompt />
        {/* grid layout of images */}
      </body>
    </html>
  );
}
