import prisma from "@/lib/prismaHelper";

// GET a book by id
export async function GET(req: Request, res: Response) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    return new Response(JSON.stringify(book), {
      status: 200,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: `Internal Server Error ${error}`,
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

// PATCH a book
export async function PATCH(req: Request, res: Response) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const body = await req.json();

    const updatedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        status: body.status,
      },
    });

    return new Response(JSON.stringify(updatedBook), {
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

// DELETE a book
export async function DELETE(req: Request, res: Response) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
  
    const deletedBook = await prisma.book.delete({
      where: { id: Number(id) },
    });

    return new Response(JSON.stringify(deletedBook), {
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
