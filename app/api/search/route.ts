import {NextResponse} from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export async function GET(req: Request){
    const {searchParams} = new URL(req.url);
    const query = searchParams.get("q") || "";

    if(!query.trim()) return NextResponse.json([]);
    
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .textSearch("search_text", query, {
            type: "websearch",
            config: 'english'
        }).limit(20)

    if(error){
        console.error(error);
        return NextResponse.json([]);
    }

    return NextResponse.json(data);
}