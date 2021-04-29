import React from "react"
import classNames from "../utils/class-names";

function TimerControl({buttonState, playPause, stop, isTimerRunning}) {
    return (
        <div className="row">
            <div className="col">
                <div
                    className="btn-group btn-group-lg mb-2"
                    role="group"
                    aria-label="Timer controls"
                >
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-testid="play-pause"
                        title="Start or pause timer"
                        disabled={buttonState.playButtonDisabled}
                        onClick={playPause}
                    >
                        <span
                            className={classNames({
                                oi: true,
                                "oi-media-play": !isTimerRunning,
                                "oi-media-pause": isTimerRunning,
                            })}
                        />
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        title="Stop the session"
                        disabled={buttonState.stopButtonDisabled}
                        onClick={stop}
                    >
                        <span className="oi oi-media-stop" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TimerControl