"use client";

import React, { useState } from "react";

export default function TextPrompt() {
  const [prompt, setPrompt] = useState("");

  return (
    <section className="m-10">
      <form className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:divide-x shadow-md shadow-gray-500 border rounded-md">
        <textarea
          className=" flex-grow p-4 outline-none  w-full resize-none"
          placeholder="Enter a Prompt"
          value={prompt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPrompt(e.target.value)
          }
        />
        <div className="flex flex-col md:flex-row gap-4 p-2 w-full flex-1">
          <button
            type="submit"
            className=" bg-fuchsia-600 p-4 text-white font-bold transition-colors duration-200 disabled:text-gray-300 disabled:bg-gray-200 hover:bg-fuchsia-800 hover:text-slate-200"
            disabled={!prompt}
          >
            Generate
          </button>
          <button
            type="button"
            className="bg-emerald-500 p-4 text-white font-bold transition-colors duration-200 disabled:text-gray-300 hover:bg-emerald-700 hover:text-slate-200"
          >
            New Suggestion
          </button>
          <button
            type="button"
            className="bg-gray-600 p-4 text-white font-bold transition-colors duration-200 disabled:text-gray-300 hover:bg-gray-800 hover:text-slate-200"
          >
            Use Suggestion
          </button>
        </div>
      </form>
    </section>
  );
}
