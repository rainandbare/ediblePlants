import {useState} from 'react'

const useUserInputTracking = (pieceOState) => {
    const [userInput, setUserInput] = useState('')

    const handleUserInput = (newInput) => {
        // console.log('hello')
        setUserInput(newInput)
    }
    return {
        userInput,
        setUserInput,
        handleUserInput
    }
}

export default useUserInputTracking;