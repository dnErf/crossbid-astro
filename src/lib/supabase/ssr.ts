import { createServerClient, parseCookieHeader } from "@supabase/ssr"

export const supabaseSsr = async (context, next) => {
    context.locals.supabase = createServerClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_ANON_KEY, {
        auth: {
            flowType: "pkce"
        },
        cookies: {
            getAll() {
                return parseCookieHeader(context?.request?.headers?.get('cookie') ?? '')
            },
            // setting cookies outside frontmatter had some issues
            setAll(cookiesToSet) {
                // cookiesToSet.forEach(({ name, value, options }) => {
                //     console.log(name)
                //     console.log(value)
                //     return context?.cookies?.set(name, value, options)
                // })
            }
        }
    })

    return next()
}
