import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

interface RouteParams {
  params: { id: string };
}

export const DELETE = async (req: NextRequest, { params }: RouteParams) => {
  try {
    await requireAdmin(req);
    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from("products").delete().eq("id", params.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    const status = error?.status ?? 500;
    return NextResponse.json({ message: error?.message ?? "Unable to delete product" }, { status });
  }
};

