"use client";
import Image from "next/image";
import { fetchGenImage } from "../lib/fetchGenImage";
import useSWR from "swr";
type UrlEntry = {
  url: string;
  name: string;
};

export default function Images() {
  const {
    data: images,
    mutate,
    isLoading,
    isValidating,
    error,
  } = useSWR("/api/images", fetchGenImage, { revalidateOnFocus: false });

  if (!isLoading && !isValidating) {
    return (
      <div>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-0 md:px-10">
          {images.imageUrls.map((image: UrlEntry, i: number) => {
            return (
              <div
                key={image.name}
                className={`relative cursor-help  ${
                  i === 0 ? `col-span-2 row-span-2` : ``
                } hover:scale-[103%] transition-transform duration-200 ease-in-out`}
              >
                <div className="absolute flex justify-center items-center w-full h-full bg-white opacity-0 hover:opacity-80 transition-opacity duration-200 z-10">
                  <p className="text-center font-light text-lg p-5">
                    {/* This removes the Timestamp and File extension */}
                    {image.name
                      .split("_")
                      .shift()
                      ?.toString()
                      .split(".")
                      .shift()}
                  </p>
                </div>
                <Image
                  src={`${image.url}`}
                  alt={image.name}
                  height={800}
                  width={800}
                  className="w-full rounded-sm shadow-xl drop-shadow-lg -z-10"
                ></Image>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>LOADING...</div>;
  }
}
