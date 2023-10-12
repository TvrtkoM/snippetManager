"use client";
import useLoginMutation from "@/queryHooks/useLogInMutation";
import useLogoutMutation from "@/queryHooks/useLogoutMutation";
import { useUserQuery } from "@/queryHooks/useUserQuery";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { from } from "rxjs";

export default function Home() {}
