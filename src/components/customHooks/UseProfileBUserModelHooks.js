import { useState } from 'react'

export default function UseProfileBUserModelHooks() {
    // states
    const [isFocusedOne, setIsFocusedOne] = useState(true)
    const [isFocusedTwo, setIsFocusedTwo] = useState(true)
    const [isFocusedThree, setIsFocusedThree] = useState(true)
    const [isFocusedFour, setIsFocusedFour] = useState(true)
    const [isFocusedFive, setIsFocusedFive] = useState(true)
    const [isFocusedSix, setIsFocusedSix] = useState(true)
    const [isFocusedSeven, setIsFocusedSeven] = useState(true)
    const [isFocusedEight, setIsFocusedEight] = useState(true)
    const [isFocusedNine, setIsFocusedNine] = useState(true)
    const [isFocusedTen, setIsFocusedTen] = useState(true)

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

    // Four Handler
    const isFocusedFourHandler = () => {
        setIsFocusedFour(!isFocusedFour)
    }

    // Five Handler
    const isFocusedFiveHandler = () => {
        setIsFocusedFive(!isFocusedFive)
    }

    // Six Handler
    const isFocusedSixHandler = () => {
        setIsFocusedSix(!isFocusedSix)
    }

    // Seven Handler
    const isFocusedSevenHandler = () => {
        setIsFocusedSeven(!isFocusedSeven)
    }

    // Eight Handler
    const isFocusedEightHandler = () => {
        setIsFocusedEight(!isFocusedEight)
    }

    // Nine Handler
    const isFocusedNineHandler = () => {
        setIsFocusedNine(!isFocusedNine)
    }

    // Ten Handler
    const isFocusedTenHandler = () => {
        setIsFocusedTen(!isFocusedTen)
    }

    return {
        isFocusedOneHandler,
        isFocusedOne,
        isFocusedTwoHandler,
        isFocusedTwo,
        isFocusedThreeHandler,
        isFocusedThree,
        isFocusedFourHandler,
        isFocusedFour,
        isFocusedFiveHandler,
        isFocusedFive,
        isFocusedSixHandler,
        isFocusedSix,
        isFocusedSevenHandler,
        isFocusedSeven,
        isFocusedEightHandler,
        isFocusedEight,
        isFocusedNineHandler,
        isFocusedNine,
        isFocusedTenHandler,
        isFocusedTen,
    }
}