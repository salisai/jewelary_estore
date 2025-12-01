import type { NextRequest } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

interface AuthenticatedUser {
  id: string;
  email?: string;
}

const UNAUTHORIZED = { status: 401, message: "Unauthorized" };
const FORBIDDEN = { status: 403, message: "Forbidden" };

export const getBearerToken = (req: NextRequest) => {
  const header = req.headers.get("authorization");
  if (!header) return null;
  const [, token] = header.split("Bearer ");
  return token?.trim() || null;
};

export const requireUser = async (req: NextRequest): Promise<AuthenticatedUser> => {
  const token = getBearerToken(req);
  if (!token) {
    throw UNAUTHORIZED;
  }

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    throw UNAUTHORIZED;
  }

  return {
    id: data.user.id,
    email: data.user.email || undefined
  };
};

export const isAdminUser = async (userId: string) => {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("admin check failed", error);
    throw FORBIDDEN;
  }

  return Boolean(data);
};

export const requireAdmin = async (req: NextRequest): Promise<AuthenticatedUser> => {
  const user = await requireUser(req);
  const admin = await isAdminUser(user.id);
  if (!admin) throw FORBIDDEN;
  return user;
};

