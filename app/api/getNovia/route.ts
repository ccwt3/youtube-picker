import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = {
    nombre: "omar",
    admin: false,
  };

  return NextResponse.json(data, { status: 200 });
}
