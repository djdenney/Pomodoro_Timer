import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import ModifyTimeControl from "./ModifyTimeControl"
import TimerControl from "./TimerControl"
import TimerDisplay from "./TimerDisplay"

function Pomodoro() {
    const initialTimeState = {
        focusDuration: 1500,
        breakDuration: 300,
        focusRemaining: 1500,
        breakRemaining: 300,
        remainingAriaValue: 0,
        currentRemaining: 1500,
    }

    const initialVisibleElementStates = {
        showSession: false,
        sessionTitle: "Focusing for 25:00 minutes",
    }

    const initialButtonStates = {
        modifyDurationButtonsDisabled: false,
        playButtonDisabled: false,
        stopButtonDisabled: true,
    }

    const activeButtonStates = {
        modifyDurationButtonsDisabled: true,
        playButtonDisabled: false,
        stopButtonDisabled: false,
    }

    const formatTime = (seconds) => {
        let formattedSeconds = parseInt(seconds, 10)
        let mm = Math.floor(formattedSeconds / 60)
        let ss = (formattedSeconds - mm * 60)
        if (mm < 10 && ss < 10) {
            return `0${mm}:0${ss}`
        } else if (mm < 10 && ss > 9 ) {
            return `0${mm}:${ss}`
        } else if (mm > 9 && ss < 10) {
            return `${mm}:0${ss}`
        } else if (mm > 9 && ss > 9) {
            return `${mm}:${ss}`
        }
    }

    const [timeData, setTimeData] = useState(initialTimeState)
    const [buttonState, setButtonStates] = useState(initialButtonStates)
    const [pageState, setPageState] = useState(initialVisibleElementStates)
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const stop = () => {
        setTimeData(initialTimeState)
        setButtonStates(initialButtonStates)
        setPageState(initialVisibleElementStates)
        setIsTimerRunning(false)
    }

    useInterval(() => {
        if (timeData.focusRemaining > 0) {
            pageState.sessionTitle = `Focusing for ${formatTime(timeData.focusDuration)} minutes`
            console.log(timeData.currentRemaining)
            timeData.currentRemaining = timeData.currentRemaining - 1
            timeData.focusRemaining = timeData.currentRemaining
            timeData.remainingAriaValue = 1 - timeData.currentRemaining / timeData.focusDuration
            if (timeData.focusRemaining === 0) {
                new Audio(`${process.env.PUBLIC_URL}/alarm/Censored_Beep-Mastercard-569981218.mp3`).play()
                timeData.currentRemaining = timeData.breakRemaining
                timeData.remainingAriaValue = 0
            }
        }
        if (timeData.focusRemaining === 0 && timeData.breakRemaining > 0) {
            pageState.sessionTitle = `On Break for ${formatTime(timeData.breakDuration)} minutes`
            console.log(timeData.currentRemaining)
            timeData.breakRemaining = timeData.currentRemaining
            timeData.currentRemaining = timeData.currentRemaining - 1        
            timeData.remainingAriaValue = 1 - timeData.currentRemaining / timeData.breakDuration
            if (timeData.breakRemaining === 0) {
                new Audio(`${process.env.PUBLIC_URL}/alarm/Censored_Beep-Mastercard-569981218.mp3`).play()
                timeData.focusRemaining = timeData.focusDuration
                timeData.breakRemaining = timeData.breakDuration
                timeData.currentRemaining = timeData.focusDuration
                console.log(timeData.focusRemaining, timeData.breakRemaining, timeData.currentRemaining)
            }
        }
        setTimeData({...timeData})
    }, isTimerRunning ? 1000 : null);

    const modifyDuration = ({target}) => {
        if (target.name === "decrease-focus" && timeData.focusDuration > 300 && timeData.focusDuration <= 3600) {
            timeData.focusDuration = timeData.focusDuration - 300
            timeData.focusRemaining = timeData.focusDuration
            timeData.currentRemaining = timeData.focusDuration
            pageState.sessionTitle = `Focusing for ${formatTime(timeData.focusDuration)} minutes`
            console.log(pageState.sessionTitle)
            setPageState({...pageState})
            setTimeData({...timeData}) 
        } else if (target.name === "increase-focus" && timeData.focusDuration >= 300 && timeData.focusDuration < 3600) {
            timeData.focusDuration = timeData.focusDuration + 300
            timeData.currentRemaining = timeData.focusDuration
            timeData.focusRemaining = timeData.focusDuration
            pageState.sessionTitle = `Focusing for ${formatTime(timeData.focusDuration)} minutes`
            setPageState({...pageState})
            setTimeData({...timeData})
        } else if (target.name === "decrease-break" && timeData.breakDuration > 60 && timeData.breakDuration <= 900) {
            timeData.breakDuration = timeData.breakDuration - 60
            timeData.breakRemaining = timeData.breakDuration
            setPageState({...pageState})
            setTimeData({...timeData})
        } else if (target.name === "increase-break" && timeData.breakDuration >= 60 && timeData.breakDuration < 900) {
            timeData.breakDuration = timeData.breakDuration + 60
            timeData.breakRemaining = timeData.breakDuration
            setPageState({...pageState})
            setTimeData({...timeData})
        }
        console.log("target name:", target, "focus duration:", timeData.focusDuration, "break duration:", timeData.breakDuration)
    }

    function playPause() {
        pageState.showSession = true
        setPageState({...pageState})
        setButtonStates(activeButtonStates)
        setIsTimerRunning((prevState) => !prevState);
    }

    return (
        <div className="pomodoro">
            <ModifyTimeControl 
                timeData={timeData} 
                buttonState={buttonState} 
                formatTime={formatTime} 
                modifyDuration={modifyDuration} 
            />
            <TimerControl 
                buttonState={buttonState} 
                playPause={playPause} stop={stop} 
                isTimerRunning={isTimerRunning} 
            />
            <TimerDisplay 
                timeData={timeData} 
                pageState={pageState} 
                formatTime={formatTime} 
            />
        </div>
    );
}


export default Pomodoro;
