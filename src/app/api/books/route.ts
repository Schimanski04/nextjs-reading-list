import prisma from "@/lib/prismaHelper";

// GET all books
export async function GET(req: Request, res: Response) {
  try {
    const books = await prisma.book.findMany({ orderBy: { id: "asc" } });
    return new Response(
      JSON.stringify(books), {
        status: 200,
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }), {
        status: 500,
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    )
  }
}

// POST a new book
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    
    if (!body.title || !body.author || !body.status) {
      return new Response(
        JSON.stringify({
          message: "Title and author must be filled in",
        }),
        {
          status: 400,
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
        }
      )
    }

    const newBook = await prisma.book.create({
      data: {
        title: body.title,
        author: body.author,
        status: body.status,
      },
    });

    return new Response(JSON.stringify(newBook), {
      status: 200,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    )
  }
}
