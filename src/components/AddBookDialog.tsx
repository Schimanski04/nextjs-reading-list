type AddBookDialogProps = {
  handleAdd: (e: React.FormEvent<HTMLFormElement>) => void;
  refAddDialog: any;
}

const AddBookDialog: React.FC<AddBookDialogProps> = ({ handleAdd, refAddDialog }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const spanElement = e.target.nextElementSibling;

    spanElement?.classList.remove("block");
    spanElement?.classList.add("hidden");

    if (!e.target.value || e.target.value.trim() === "" || e.target.value[0] === " ") {
      spanElement?.classList.remove("hidden");
      spanElement?.classList.add("block");
    }
  }

  return (
    <dialog
      className="p-0 backdrop:bg-gray-400 backdrop:bg-opacity-50 rounded-md"
      ref={refAddDialog}
    >
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Add a new book</h2>
        <form onSubmit={(e) => {
          handleAdd(e);
        }}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              name="title"
              type="text"
              placeholder="Book title"
              onChange={(e) => handleChange(e)}
            />
            <span className="hidden text-red-500 text-sm font-bold mt-1">
              You must fill in the title of the book
            </span>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="author"
            >
              Author
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="author"
              name="author"
              type="text"
              placeholder="Author name"
              onChange={(e) => handleChange(e)}
            />
            <span className="hidden text-red-500 text-sm font-bold mt-1">
              You must fill in the author's name
            </span>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                refAddDialog.current.close();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

export default AddBookDialog;
