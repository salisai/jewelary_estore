import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getProductRecommendations } from "@/services/geminiService";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const POST = async (req: NextRequest) => {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ message: "Missing query" }, { status: 400 });
    }
    const supabase = createSupabaseAdmin();
    const { data: products, error } = await supabase.from("products").select("*").limit(50);

    if (error) {
      throw error;
    }

    const { recommendedIds, reasoning } = await getProductRecommendations(query, products || []);
    return NextResponse.json({ recommendedIds, reasoning });
  } catch (error: any) {
    console.error("ai stylist route error", error);
    return NextResponse.json(
      {
        recommendedIds: [],
        reasoning: "Our stylist is unavailable. Please browse the collection."
      },
      { status: 500 }
    );
  }
};

