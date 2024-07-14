import React, { useEffect } from "react"
import { Datepicker } from "flowbite"

let style = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

type options = {
    date?: Date;
    setDate?: React.Dispatch<React.SetStateAction<Date|undefined>>;
    dpRef?: React.MutableRefObject<any>;
}

export default ({dpRef, setDate}: options) => {
    let dp:Datepicker;

    useEffect(() => {
        dp = new Datepicker(dpRef.current)
    }, [])

    return (     
        <div className="relative max-w-sm" >
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
            </div>
            {/* datepicker="true" datepicker-autohide="true" */}
            <input id="datepicker-autohide" ref={dpRef} type="text" className={style} placeholder="Select date" onSelect={handleSelect} onKeyDown={handleKeyDown} />
        </div>
    )

    function handleSelect() {
        if (dp === undefined) {
            dp = new Datepicker(dpRef.current)
        }

        if (dp !== undefined && dp.getDate() !== undefined) {
            let dt = dp.getDate()
            setDate(new Date(dt.toString()))
            dp.hide()
        }
    }

    function handleKeyDown(ev) {
        if (ev.key === 'Unidentified') {
            console.error('error on flowbite: does not handle selecting saved data or when key down event happened')
            return
        }
    }
}
