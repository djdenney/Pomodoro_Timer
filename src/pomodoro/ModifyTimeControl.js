import React from "react"

function ModifyTimeControl({timeData, buttonState, formatTime, modifyDuration}) {
    return (
        <div className="row">
            <div className="col">
                <div className="input-group input-group-lg mb-2">
                    <span className="input-group-text" data-testid="duration-focus">
                    Focus Duration: {formatTime(timeData.focusDuration)}
                    </span>
                    <div className="input-group-append">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-testid="decrease-focus"
                            name="decrease-focus"
                            disabled={buttonState.modifyDurationButtonsDisabled}
                            onClick={modifyDuration}
                        >
                            <span style={{zIndex: -1}} className="oi oi-minus" />
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-testid="increase-focus"
                            name="increase-focus"
                            disabled={buttonState.modifyDurationButtonsDisabled}
                            onClick={modifyDuration}
                        >
                            <span style={{zIndex: -1}} className="oi oi-plus" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="float-right">
                    <div className="input-group input-group-lg mb-2">
                        <span className="input-group-text" data-testid="duration-break">
                            Break Duration: {formatTime(timeData.breakDuration)}
                        </span>
                        <div className="input-group-append">
                            <button
                            type="button"
                            className="btn btn-secondary"
                            data-testid="decrease-break"
                            name="decrease-break"
                            disabled={buttonState.modifyDurationButtonsDisabled}
                            onClick={modifyDuration}
                            >
                                <span style={{zIndex: -1}} className="oi oi-minus" />
                            </button>
                            <button
                            type="button"
                            className="btn btn-secondary"
                            data-testid="increase-break"
                            name="increase-break"
                            disabled={buttonState.modifyDurationButtonsDisabled}
                            onClick={modifyDuration}
                            >
                                <span style={{zIndex: -1}} className="oi oi-plus" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
}


export default ModifyTimeControl