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

  const submitPrompt = async (useSuggestion?: boolean) => {
    const userInput = prompt;
    setPrompt("");

    const sendToApi = useSuggestion
      ? suggestion.trim()
      : userInput.trim() || suggestion.trim();

    const res = await fetch("/api/genImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: sendToApi }),
    });

    const text = await res.json();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  return (
    <section className="m-10">
      <form
        onSubmit={handleSubmit}
        className="h-[50%] md:h-full flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:divide-x shadow-md shadow-gray-500 border rounded-md"
      >
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
            onClick={() => submitPrompt(true)}
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
