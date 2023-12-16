"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function JsonPage({ params }: { params: { id: number } }) {
  const [book, setBook] = useState<Book>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    fetch(`/api/books/${params.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setIsLoading(false);
      });
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(book, null, 2)
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 4000);
    } catch (err) {
      setIsCopied(false);
    }
  }

  return (
    <main>
      <div className="flex items-center justify-center min-h-screen">

        {/* Home button link*/}
        <Link
          href="/"
          className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded-full absolute top-0 right-0 m-5 w-12 h-12 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faHouse} size="xl" />
        </Link>

        {/* JSON */}
        <div className="relative bg-gray-800 p-4 rounded text-white font-mono text-sm overflow-x-auto w-5/6">
          <div className="absolute top-0 left-0 flex space-x-1 m-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <button
            onClick={handleCopy}
            className="absolute top-0 right-0 m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isCopied && <span className="mr-2 text-white">Copied!</span>}
            <FontAwesomeIcon icon={faCopy} />
          </button>
          <pre className="pt-8">
            <span className="block text-green-400">
              // Book Information in JSON Format
            </span>
            {isLoading ? (
              <Skeleton height={16} count={6} baseColor="#2b3747" highlightColor="#3b4757" />
            ) : (
              <code className="text-slate-300">
                {JSON.stringify(book, null, 2)}
              </code>
            )}
          </pre>
        </div>
      </div>
    </main>
  )
}
