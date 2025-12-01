import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const GET = async () => {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("products load error", error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }

  return NextResponse.json({ products: data || [] });
};

export const POST = async (req: NextRequest) => {
  try {
    await requireAdmin(req);
    const payload = await req.json();
    const supabase = createSupabaseAdmin();

    const newProduct = {
      name: payload.name,
      price: Number(payload.price),
      category: payload.category,
      description: payload.description,
      image: payload.image,
      stock: Number(payload.stock ?? 0)
    };

    const { data, error } = await supabase.from("products").insert([newProduct]).select().single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ product: data }, { status: 201 });
  } catch (error: any) {
    const status = error?.status ?? 500;
    return NextResponse.json({ message: error?.message ?? "Unable to add product" }, { status });
  }
};

