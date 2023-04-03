"use client";

import fetchSuggestFromGPT from "@/lib/fetchSuggestFromGPT";
import React, { useState } from "react";
import useSWR from "swr";

export default function TextPrompt() {
  const [prompt, setPrompt] = useState("");

  const {
    data: suggestion,
    error,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestFromGPT, {
    revalidateOnFocus: false,
  });

  const loading = isLoading || isValidating;

  return (
    <section className="m-10 h-screen md:h-full">
      <form className="h-[50%] md:h-full flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:divide-x shadow-md shadow-gray-500 border rounded-md">
        <textarea
          className=" flex-grow p-4 outline-none  w-full resize-none"
          placeholder={
            (loading && "Thinking...") || suggestion?.trim() || "Enter a Prompt"
          }
          value={prompt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPrompt(e.target.value)
          }
        />
        <div className="flex flex-col md:flex-row md:items-center gap-4 p-2 w-full">
          <button
            type="submit"
            className=" bg-fuchsia-600 p-4 text-white font-bold transition-colors duration-200 disabled:text-gray-300 disabled:bg-gray-200 hover:bg-fuchsia-800 hover:text-slate-200 flex-grow"
            disabled={!prompt}
            onClick={() => null}
          >
            Generate Image
          </button>
          <button
            type="button"
            className="bg-emerald-500 p-4 text-white font-bold transition-colors duration-200 disabled:text-gray-300 hover:bg-emerald-700 hover:text-slate-200 flex-grow"
            onClick={mutate}
          >
            New Suggestion
          </button>
          <button
            type="button"
            className="bg-gray-600 p-4 text-white font-bold transition-colors duration-200 disabled:text-gray-300 hover:bg-gray-800 hover:text-slate-200flex-grow"
          >
            Use Suggestion
          </button>
        </div>
      </form>
      {prompt && (
        <p className="mt-2">
          Suggestion:{" "}
          <span className=" text-fuchsia-600">
            {" "}
            {loading || error
              ? "thinking..."
              : suggestion?.trim() ||
                "Create an oil painting of a mountain Landscape in the style of Bob Ross"}
          </span>
        </p>
      )}
    </section>
  );
}
