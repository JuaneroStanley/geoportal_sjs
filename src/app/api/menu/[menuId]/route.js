import { query } from "@/app/global/db";

export async function GET(req, { params }) {
  const { menuId } = params;
  try {
    const { rows } = await query("SELECT * FROM menus WHERE id = $1", [menuId]);
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
