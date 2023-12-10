import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaHelper";

// GET all books
export async function GET(req: NextApiRequest, res: NextApiResponse) {
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
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const newBook = await prisma.book.create({
    data: req.body,
  });
  res.json(newBook);
}

// PATCH a book
export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  const updatedBook = await prisma.book.update({
    where: { id: Number(req.query.id) },
    data: req.body,
  });
  res.json(updatedBook);
}

// DELETE a book
export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const deletedBook = await prisma.book.delete({
    where: { id: Number(req.query.id) },
  });
  res.json(deletedBook);
}
