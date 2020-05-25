import React, { useEffect, useState, useRef } from 'react'

function TaskDetailsView() {
    const outside = useRef()
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = e => {
        if (outside.current.contains(e.target)) {
            return
        }
        setIsOpen(false)
    }

    useEffect(() => {
        const getClick = document.addEventListener('click', handleClick)

        return () => {
            getClick()
        }
    }, [])

    return (
        <div
            ref={outside}
            >
            <button onClick={() => setIsOpen(!isOpen)}>toggle modal</button>
            {isOpen ? (
                <div className="myModal">
                    <p>Modal is open</p>
                </div>
            ) : null}
        </div>
    )
}

export default TaskDetailsView;
//  https://www.youtube.com/watch?v=xSp98W9EYP8