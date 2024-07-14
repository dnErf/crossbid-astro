import { supabase } from "@/lib/supabase/web"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"

export default () => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Input type="email" id="email" name="email" placeholder="email" />
            </div>
            <div>
                <Input type="password" id="password" name="password" placeholder="password" />
            </div>
            <div>
                <Button type="submit">
                    Log In
                </Button>
            </div>
        </form>
    )

    async function handleSubmit(ev) {
        ev.preventDefault()
        let fd = new FormData(ev.currentTarget)

        let auth = await supabase.auth.signInWithPassword({
            email: fd.get("email").toString(),
            password: fd.get("password").toString()
        })

        console.log("===")
        console.log(auth)
        console.log("===")

        let { access_token, refresh_token } = auth.data.session
        let login = await fetch("/~api/session", {
            method: "POST",
            body: JSON.stringify({ access_token, refresh_token })
        })

        console.log(login)
        
        // window.location.href
    }
}