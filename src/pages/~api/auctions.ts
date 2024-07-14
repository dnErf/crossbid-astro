import type { APIRoute } from "astro"
import { supabase } from "@/lib/supabase/web"

export const POST: APIRoute = async ({ cookies, request }) => {
    let form = await request.formData()
    let imageFile = form.get("imageFile") as File
    let imageBuf = await imageFile.arrayBuffer()

    let accessToken = cookies.get("sb-access-token")
    if (accessToken === undefined) {
        return new Response(JSON.stringify({ message: "This was a POST!" }))
    }

    let { data } = await supabase.auth.getSession()
    let userId = data?.session?.user?.id

    if (userId === undefined || userId === null || !userId.length) {
        return new Response(JSON.stringify({ message: "This was a POST!" }))
    }

    let saveImage = await supabase.storage
        .from("temp")
        .upload(`${imageFile.name}`, Buffer.from(imageBuf), {
            contentType: imageFile.type
        })

    if (!saveImage.data) {
        console.log('===')
        console.log(saveImage)
        console.log('===')
        return new Response(JSON.stringify({ message: "This was a POST!" }))
    }

    let getImage = await supabase.storage
        .from("temp")
        .getPublicUrl(`${imageFile.name}`)

    if (!getImage.data) {
        console.log('===')
        console.log(getImage)
        console.log('===')
        return new Response(JSON.stringify({ message: "This was a POST!" }))
    }

    // let userId = form.get("userId")
    let name = form.get("name")
    let endDate = form.get("endDate")
    let priceInWhole = Number(form.get("priceInWhole"))
    let centsPrice = Math.floor(priceInWhole * 100)

    let results = await supabase
        .from('crossbid_auctions')
        .upsert({ 
            user_id: userId,
            name: name,
            image_url: getImage.data.publicUrl,
            cents_current_bid: centsPrice,
            cents_starting_price: centsPrice,
            cents_bid_interval: 1000,
            end_at: endDate
         })
        .select()

    if (results.error !== null) {
        console.log('===')
        console.log(results)
        console.log('===')
        return new Response(JSON.stringify({ message: "This was a POST!" }))
    }

    return new Response(JSON.stringify({ message: "This was a POST!" }))
}
