import React from 'react'
import "./Style.css"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'



const App = () => {
    const [darkMode, setDarkMode] = React.useState(true)
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function newDieGeneration() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                newDieGeneration
            })
        }
        return newDice
    }

    function rollDice() {
        if (!tenzies) {
            setDice(prevState => prevState.map(die => {
                return die.isHeld ?
                    die :
                    newDieGeneration()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    function holdDice(id) {
        setDice(prevState => prevState.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }
    function toggleDarkMode() {
        setDarkMode(prevState => !prevState)
    }

    const diceElements = dice.map(die =>
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />)

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className='title'>Tenzies</h1>
            <p className='instruction'>Roll until all dice are the same. Click each die to freeze it at current value between rolls</p>
            <div className='dice-container'>
                {diceElements}
            </div>
            <button className='roll-die' onClick={rollDice}>{tenzies ? "New Game" : "ROLL DIE"}</button>
        </main>
    )
}

export default App
