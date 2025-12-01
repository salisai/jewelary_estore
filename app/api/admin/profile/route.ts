import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireUser, isAdminUser } from "@/lib/auth";

export const GET = async (req: NextRequest) => {
  try {
    const user = await requireUser(req);
    const isAdmin = await isAdminUser(user.id);
    return NextResponse.json({ isAdmin });
  } catch (error: any) {
    const status = error?.status ?? 500;
    return NextResponse.json({ message: error?.message ?? "Error" }, { status });
  }
};

