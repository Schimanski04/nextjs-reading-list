import { faDatabase, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Book = {
  id: number;
  title: string;
  author: string;
  status: "IVE_READ" | "IAM_READING" | "I_WANT_TO_READ";
}

type BookItemProps = {
  book: Book;
  handleChangeStatus: (id: number, status: Book["status"]) => void;
  setBookIdToDelete: (id: number) => void;
  refDeleteDialog: React.RefObject<HTMLDialogElement>;
};

const BookItem: React.FC<BookItemProps> = ({ book, handleChangeStatus, setBookIdToDelete, refDeleteDialog }) => {
  return (
    <div
      key={book.id}
      className="flex flex-row justify-between items-center border-b-2 border-gray-200 py-2"
    >
      <div className="flex flex-col">
        <h3
          className={
            book.status == "IVE_READ"
              ? "text-xl font-bold line-through"
              : "text-xl font-bold"
          }
        >
          {book.title}
        </h3>
        <p className="text-gray-500">{book.author}</p>
      </div>
      <div className="flex flex-row">
        <button
          className={
            book.status == "IVE_READ"
              ? "bg-blue-500 text-white font-bold py-2 px-4 rounded"
              : "bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          }
          onClick={() => handleChangeStatus(book.id, "IVE_READ")}
        >
          I've Read
        </button>
        <button
          className={
            book.status == "IAM_READING"
              ? "bg-blue-500 text-white font-bold py-2 px-4 rounded mx-2"
              : "bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mx-2"
          }
          onClick={() => handleChangeStatus(book.id, "IAM_READING")}
        >
          I'm Reading
        </button>
        <button
          className={
            book.status == "I_WANT_TO_READ"
              ? "bg-blue-500 text-white font-bold py-2 px-4 rounded"
              : "bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          }
          onClick={() => handleChangeStatus(book.id, "I_WANT_TO_READ")}
        >
          I Want to Read
        </button>
        <Link href={`/books/${book.id}/json`}>
          <button className="bg-amber-400 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded ml-2">
            <FontAwesomeIcon icon={faDatabase} />
            <span className="ml-2">View JSON</span>
          </button>
        </Link>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={() => {
            setBookIdToDelete(book.id);
            refDeleteDialog.current?.showModal();
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </div>
  )
}

export default BookItem;
