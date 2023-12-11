import prisma from "@/lib/prismaHelper";

// GET all books
export async function GET(req: Request, res: Response) {
  const books = await prisma.book.findMany();
  // return res.json(books);
  return new Response(
    JSON.stringify({
        data: books,
        message: "User exists",
        status: 409
    })
  )
}

// POST a new book
export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const newBook = await prisma.book.create({
    data: body,
  });
  // res.json(newBook)
  return new Response(
    JSON.stringify({
        data: newBook,
        message: "User exists",
        status: 409
    })
  )
}

// PATCH a book
export async function PATCH(req: Request, res: Response) {
  const body = await req.json();

  const updatedBook = await prisma.book.update({
    where: { id: Number(body.id) },
    data: body,
  });
  // res.json(updatedBook);
  return new Response(
    JSON.stringify({
        data: updatedBook,
        message: "User exists",
        status: 409
    })
  )
}

// DELETE a book
export async function DELETE(req: Request, res: Response) {
  const body = await req.json();

  const deletedBook = await prisma.book.delete({
    where: { id: Number(body.id) },
  });
  // res.json(deletedBook);
  return new Response(
    JSON.stringify({
        data: deletedBook,
        message: "User exists",
        status: 409
    })
  )
}
