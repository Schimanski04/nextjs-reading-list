type DeleteBookDialogProps = {
  handleDelete: (id: number) => void;
  bookIdToDelete: number;
  setBookIdToDelete: (id: number) => void;
  refDeleteDialog: React.RefObject<HTMLDialogElement>;
};

const DeleteBookDialog: React.FC<DeleteBookDialogProps> = ({ handleDelete, bookIdToDelete, setBookIdToDelete, refDeleteDialog }) => {
  return (
    <dialog
      className="p-0 backdrop:bg-gray-400 backdrop:bg-opacity-50 rounded-md"
      ref={refDeleteDialog}
    >
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">
          Are you sure you want to delete this book?
        </h2>
        <div className="flex items-center justify-between">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              handleDelete(bookIdToDelete);
            }}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setBookIdToDelete(0);
              refDeleteDialog.current?.close();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default DeleteBookDialog;
