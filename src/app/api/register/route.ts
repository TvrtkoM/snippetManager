import { dbClient } from "@/app/db-client";
import { Session, User } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(
  request: Request
): Promise<
  NextResponse<
    { error?: string } | { user: User | null; session: Session | null }
  >
> {
  const dbClient = createRouteHandlerClient({ cookies });
  const { email, password } = await request.json();
  const { data, error } = await dbClient.auth.signUp({
    email,
    password
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json({ ...data }, { status: 200 });
  }
}
