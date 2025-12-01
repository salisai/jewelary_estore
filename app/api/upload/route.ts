import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export const POST = async (req: NextRequest) => {
  try {
    await requireAdmin(req);
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Missing file" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileExt = file.name.split(".").pop();
    const fileName = `${randomUUID()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const supabase = createSupabaseAdmin();
    const { error } = await supabase.storage.from("jewelry-images").upload(filePath, buffer, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type
    });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage.from("jewelry-images").getPublicUrl(filePath);
    return NextResponse.json({ url: data.publicUrl });
  } catch (error: any) {
    const status = error?.status ?? 500;
    return NextResponse.json({ message: error?.message ?? "Upload failed" }, { status });
  }
};

