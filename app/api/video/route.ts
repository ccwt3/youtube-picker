import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import "dotenv/config";

export async function GET(request: Request) {
  const body = await request.json();
  const filters = body.filterData;
  console.log(filters);

  //try {
  //  const response = await fetch(url);
  //  const data = await response.json();
  //  return NextResponse.json(data, { status: 200 });
  //} catch (err) {
  //  console.error("error al consultar la API: ", err);
  //}
}
