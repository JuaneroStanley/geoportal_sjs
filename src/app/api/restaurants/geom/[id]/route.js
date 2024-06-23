import { query } from "@/app/global/db";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const { rows } = await query("SELECT geom FROM restaurants WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "Restaurant not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return new Response(JSON.stringify(rows[0]), {
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
