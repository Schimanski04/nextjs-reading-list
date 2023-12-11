"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const refDialog: any = useRef(null);

  useEffect(() => {

    setBooks([
      { id: 1, title: "test1", author: "test1", status: "IVE_READ" },
      { id: 2, title: "test2", author: "test2", status: "IAM_READING" },
      { id: 3, title: "test3", author: "test3", status: "I_WANT_TO_READ" },
      { id: 4, title: "test4", author: "test4", status: "IVE_READ" },
      { id: 5, title: "test5", author: "test5", status: "IVE_READ" },
      { id: 6, title: "test6", author: "test6", status: "IAM_READING" },
      { id: 7, title: "test7", author: "test7", status: "I_WANT_TO_READ" },
      { id: 8, title: "test8", author: "test8", status: "IVE_READ" },
      { id: 9, title: "test9", author: "test9", status: "IVE_READ" },
      { id: 10, title: "test10", author: "test10", status: "I_WANT_TO_READ" },
    ]);
  }, [])

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (e.target as any).title.value;
    const author = (e.target as any).author.value;
    const status = "I_WANT_TO_READ";

    setBooks([...books, { id: books.length + 1, title, author, status }]);

    const modal = document.querySelector("dialog") as HTMLDialogElement;
    modal.close();

    (e.target as any).title.value = "";
    (e.target as any).author.value = "";
  }

  const handleChangeStatus = (book: Book, status: "IVE_READ" | "IAM_READING" | "I_WANT_TO_READ") => {
    const updatedBooks: Book[] = books.map((b) => {
      if (b.id === book.id) {
        return { ...b, status: status };
      }
      return b;
    });
  
    setBooks(updatedBooks);
  }

  const handleDelete = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12">

      {/* Add button */}
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded-full absolute top-0 right-0 m-5 w-12 h-12 flex items-center justify-center"
        onClick={() => {
          // const modal = document.querySelector("dialog") as HTMLDialogElement;
          // modal.showModal();
          refDialog.current.showModal();
        }}
      >
        <FontAwesomeIcon icon={faPlus} size="xl" />
      </button>

      <Image src="/books.svg" alt="Books" width={125} height={125} />
      <h1 className="text-4xl font-bold my-4">My Reading List</h1>
      <div className="flex flex-col w-full">
        <div className="flex flex-col mt-4">
          {books.map((book: Book) => (
            <div
              key={book.id}
              className="flex flex-row justify-between items-center border-b-2 border-gray-300 py-2"
            >
              <div className="flex flex-col">
                <h3 className={book.status == "IVE_READ" ? "text-xl font-bold line-through" : "text-xl font-bold"}>{book.title}</h3>
                <p className="text-gray-500">{book.author}</p>
              </div>
              <div className="flex flex-row">
                <button
                  className={book.status == "IVE_READ" ? "bg-blue-500 text-white font-bold py-2 px-4 rounded" : "bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"}
                  onClick={() => handleChangeStatus(book, "IVE_READ")}
                >
                  I've Read
                </button>
                <button
                  className={book.status == "IAM_READING" ? "bg-blue-500 text-white font-bold py-2 px-4 rounded mx-2" : "bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mx-2"}
                  onClick={() => handleChangeStatus(book, "IAM_READING")}
                >
                  I'm Reading
                </button>
                <button
                  className={book.status == "I_WANT_TO_READ" ? "bg-blue-500 text-white font-bold py-2 px-4 rounded" : "bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"}
                  onClick={() => handleChangeStatus(book, "I_WANT_TO_READ")}
                >
                  I Want to Read
                </button>
                <Link href={`/books/${book.id}/json`}>
                  <button
                    className="bg-neutral-400 hover:bg-neutral-600 text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    <FontAwesomeIcon icon={faDatabase} />
                    <span className="ml-2">View JSON</span>
                  </button>
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={() => handleDelete(book.id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding a new book */}
      <dialog className="p-0 backdrop:bg-gray-400 backdrop:bg-opacity-50 rounded-md" ref={refDialog}>
        <div className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-2xl mb-4">Add a new book</h2>
          <form onSubmit={(e) => handleAdd(e)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="Book title" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                Author
              </label>
              <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="author" name="author" type="text" placeholder="Author name" />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Submit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                onClick={() => {
                  // const modal = document.querySelector("dialog") as HTMLDialogElement;
                  // modal.close();
                  refDialog.current.close();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </main>
  )
}
