import { NextResponse } from "next/server";
import "dotenv/config";

export async function POST(request: Request) {
  const body = await request.json();
  const filters = body.filterData;  

  let query = "Philosophy";
  //! Recordemos que el harvester va a agarrar los videos, los va a curar y separar para almacenarlos en la base de datos.
  //! Y que nosotros accedamos a la base de datos sin limitaciones y com mejor categorizacion.
  const url = "supabase";

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("error al consultar la API: ", err);
  }
}
