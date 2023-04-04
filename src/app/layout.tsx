import Header from "@/components/Header";
import TextPrompt from "@/components/TextPrompt";
import "./globals.css";
import Images from "@/components/Images";
import ToasterProvider from "@/components/ToasterProvider";

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
        <ToasterProvider>
          {/* HEADER */}
          <Header />
          {/* Prompt */}
          <TextPrompt />
          {/* grid layout of images */}
          <Images />
          {children}
        </ToasterProvider>
      </body>
    </html>
  );
}
