import { useRef, useState } from "react"
import { supabase } from "@/lib/supabase/web"
import Input from "@/components/ui/input"
import InputFile from "@/components/ui/input-file"
import Button from "@/components/ui/button"
import DatePicker from "@/components/ui/date-picker"

export default AuctionForm

function AuctionForm() {
    let [date, setDate] = useState<Date|undefined>()
    let dpRef = useRef()


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Auction</label>
                <Input type="text" name="name" placeholder="name the auction for" />
            </div>
            <div>
                {/* starting price */}
                <label htmlFor="price">Starting Price</label>
                <Input type="number" name="priceInWhole" placeholder="$ 0.00" />
            </div>
            <div>
                {/* image */}
                <InputFile id="imageFile" name="imageFile" />
            </div>
            <div>
                {/* end date */}
                <DatePicker dpRef={dpRef} setDate={setDate}/>
            </div>
            <div>
                <Button type="submit">create auction</Button>
            </div>
        </form>
    )

    async function handleSubmit(ev) {
        ev.preventDefault()
        let fd = new FormData(ev.currentTarget)
        fd.append('endDate', date.toDateString())

        await fetch('/~api/auctions', {
            method: "POST",
            body: fd
        })

        window.history.pushState({}, '', "")
        window.location.assign("/")
    }

}
