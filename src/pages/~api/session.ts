import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ cookies, request }) => {
    let { access_token, refresh_token } = await request.json()

    console.log("===")
    console.log(access_token)
    console.log(refresh_token)
    console.log("===")

    cookies.set("sb-access-token", access_token, {
        path: "/"
    })

    cookies.set("sb-refresh-token", refresh_token, {
        path: "/"
    })

    return new Response(null, { status: 200 })
}
