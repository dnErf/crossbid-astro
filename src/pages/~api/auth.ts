import type { APIRoute } from "astro"
import type { Provider } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/web"

export const PUT: APIRoute = async ({ cookies, redirect }) => {
    console.log("=== PATCH")
    cookies.delete("sb-access-token", { path: "/" })
    cookies.delete("sb-refresh-token", { path: "/" })

    return redirect("/")
}

export const POST: APIRoute = async ({ request, redirect }) => {
    let form = await request.formData()
    let provider = form.get("provider")

    if (!provider) {
        return new Response("there is something wrong", { status: 400 })
    }

    let { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
            redirectTo: "http://localhost:4321/~api/auth"
        }
    })

    if (error) {
        return new Response(error.message, { status: 500 })
    }

    return redirect(data.url)
}

export const GET: APIRoute = async ({ cookies, redirect, url }) => {
    let authCode = url.searchParams.get("code")

    if (!authCode) {
        return new Response("there is something wrong", { status: 400 })
    }

    let { data, error } = await supabase.auth.exchangeCodeForSession(authCode)

    if (error) {
        
        return new Response(error.message, { status: 500 })
    }

    let { access_token, refresh_token } = data.session

    cookies.set("sb-access-token", access_token, {
        path: "/"
    })

    cookies.set("sb-refresh-token", refresh_token, {
        path: "/"
    })

    return redirect("/")
}
