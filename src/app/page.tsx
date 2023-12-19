"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BookItem from "@/components/BookItem";
import AddBookDialog from "@/components/AddBookDialog";
import DeleteBookDialog from "@/components/DeleteBookDialog";

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookIdToDelete, setBookIdToDelete] = useState<number>(0);
  const refAddDialog: React.RefObject<HTMLDialogElement> = useRef(null);
  const refDeleteDialog: React.RefObject<HTMLDialogElement> = useRef(null);

  useEffect(() => {
    fetch("/api/books", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setIsLoading(false);
      });
  }, []);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const title = (e.target as any).title.value;
    const author = (e.target as any).author.value;

    await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        title: title,
        author: author,
        status: "I_WANT_TO_READ",
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((newBook) => {
      toast.success("Book added successfully");
      fetch("/api/books", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setIsLoading(false);
      });
    })
    .catch((err) => {
      toast.error("Error adding book");
      setIsLoading(false);
    });

    refAddDialog.current?.close();

    (e.target as any).title.value = "";
    (e.target as any).author.value = "";
  }

  const handleChangeStatus = async (id: number, status: "IVE_READ" | "IAM_READING" | "I_WANT_TO_READ") => {
    setIsLoading(true);
    await fetch(`/api/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        status: status,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((updatedBook) => {
      toast.success("Book status updated successfully");
      fetch("/api/books", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setIsLoading(false);
      });
    })
    .catch((err) => {
      toast.error("Error updating book status");
      setIsLoading(false);
    });
  }

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    await fetch (`/api/books/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((deletedBook) => {
      toast.success("Book deleted successfully");
      fetch("/api/books", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setIsLoading(false);
      });
    })
    .catch((err) => {
      toast.error("Error deleting book");
      setIsLoading(false);
    });

    refDeleteDialog.current?.close();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12">
      
      {/* Add button */}
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded-full absolute top-0 right-0 m-5 w-12 h-12 flex items-center justify-center"
        onClick={() => {
          refAddDialog.current?.showModal();
        }}
      >
        <FontAwesomeIcon icon={faPlus} size="xl" />
      </button>

      {/* Title */}
      <Image src="/books.svg" alt="Books" width={125} height={125} />
      <h1 className="text-4xl font-bold my-4">My Reading List</h1>

      {/* Books list */}
      <div className="flex flex-col w-full">
        <div className="flex flex-col mt-4">
          {isLoading ? (
            <Skeleton count={5} height={52} className="mt-2 mb-[9.6px]" />
          ) : (
            books.length > 0 ? (
              books.map((book: Book) => (
                <BookItem
                  key={book.id}
                  book={book}
                  handleChangeStatus={handleChangeStatus}
                  setBookIdToDelete={setBookIdToDelete}
                  refDeleteDialog={refDeleteDialog}
                />
              ))
            ) : (
              <p className="text-center text-gray-600">No books available.</p>
            )
          )}
        </div>
      </div>

      {/* Modal for adding a new book */}
      <AddBookDialog handleAdd={handleAdd} refAddDialog={refAddDialog} />

      {/* Modal for deleting a book */}
      <DeleteBookDialog
        handleDelete={handleDelete}
        bookIdToDelete={bookIdToDelete}
        setBookIdToDelete={setBookIdToDelete}
        refDeleteDialog={refDeleteDialog}
      />
    </main>
  )
}

export default Home;
