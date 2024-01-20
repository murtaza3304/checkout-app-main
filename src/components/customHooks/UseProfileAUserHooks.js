import { useState } from 'react'

export default function UseProfileAUserHooks() {
    // states
    const [isFocusedOne, setIsFocusedOne] = useState(true)
    const [isFocusedTwo, setIsFocusedTwo] = useState(true)
    const [isFocusedThree, setIsFocusedThree] = useState(true)

    // One Handler
    const isFocusedOneHandler = () => {
        setIsFocusedOne(!isFocusedOne)
    }

    // Two Handler
    const isFocusedTwoHandler = () => {
        setIsFocusedTwo(!isFocusedTwo)
    }

    // Three Handler
    const isFocusedThreeHandler = () => {
        setIsFocusedThree(!isFocusedThree)
    }

    return {
        isFocusedOneHandler,
        isFocusedOne,
        isFocusedTwoHandler,
        isFocusedTwo,
        isFocusedThreeHandler,
        isFocusedThree,
    }
}