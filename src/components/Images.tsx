"use client";
import Image from "next/image";
import { fetchGenImages } from "../lib/fetchGenImages";
import useSWR from "swr";
import Loading from "./Loading";
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
  } = useSWR("/api/getImages", fetchGenImages, { revalidateOnFocus: false });

  if (!isLoading && !isValidating) {
    return (
      <section>
        <div>
          <button
            className="fixed bottom-10 right-12 bg-emerald-500 text-white font-bold px-5 py-3 rounded-md z-20 hover:bg-emerald-700 hover:text-slate-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            onClick={() => mutate(images)}
          >
            {!isLoading && isValidating ? "Refreshing..." : "Refresh Images"}
          </button>
        </div>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-8 md:px-10">
          {images?.imageUrls?.map((image: UrlEntry, i: number) => {
            return (
              <div
                key={image.name}
                className={`relative cursor-help  ${
                  i === 0 ? `md:col-span-2 row-span-2` : ``
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
      </section>
    );
  } else {
    return (
      <section
        role="loading"
        className="flex flex-col gap-4 justify-center items-center h-[50vh]"
      >
        {" "}
        <p className="font-bold text-gray-400">
          Loading AI Generated Images...
        </p>
        <Loading fillColor="fuchsia" height={12} width={12}></Loading>
      </section>
    );
  }
}
