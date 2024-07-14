let style = "block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"

export default (props) => {
    return (
        <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload file</label>
            <input className={style} aria-describedby="user_avatar_help" type="file" {...props} />
            {/* <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div> */}
        </>
    )
}
