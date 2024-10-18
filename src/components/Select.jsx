import React, { useId } from "react"

const Select = ({
    options,
    className = '',
    label,
    ...props
}, ref) => {

    const id = useId()

    return (
        <>
            <div className="w-full">
                {
                    label &&
                    <label
                        className="inline-block mb-1 pl-1"
                        htmlFor={id}>
                        {label}
                    </label>
                }
                <Select {...props} id={id} ref={ref} className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-grey-200 border w-full`}>
                    {
                        options?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }
                </Select>
            </div>
        </>
    )
}

export default React.forwardRef(Select)