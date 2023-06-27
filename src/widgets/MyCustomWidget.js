import React, { useEffect, useState } from "react";

export default function MyCustomWidget() {
  const [stopwatchData, setStopwatchData] = useState({
    time: 0,
    isRunning: false,
    lap: [],
    time_started: 0,
    pause: [],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStopwatchData((stopwatch) => {
        if (stopwatch.isRunning) {
          return {
            ...stopwatch,
            time:
              new Date() -
              stopwatch.time_started -
              stopwatch.pause.reduce((a, b) => a + b, 0),
          };
        }
        return stopwatch;
      });
    }, 10);
    return () => clearInterval(interval);
  }, [stopwatchData]);

  const handleStart = () => {
    setStopwatchData((stopwatch) => {
      return {
        ...stopwatch,
        isRunning: true,
        time_started:
          new Date() -
          stopwatch.time -
          stopwatch.pause.reduce((a, b) => a + b, 0),
      };
    });
  };

  const handleStop = () => {
    setStopwatchData((stopwatch) => {
      return {
        ...stopwatch,
        isRunning: false,
        pause: [
          ...stopwatch.pause,
          new Date() -
            stopwatch.time_started -
            stopwatch.pause.reduce((a, b) => a + b, 0),
        ],
      };
    });
  };

  const handleReset = () => {
    setStopwatchData((stopwatch) => {
      return { ...stopwatch, time: 0, isRunning: false, lap: [] };
    });
  };

  const handleLap = (id) => {
    setStopwatchData((stopwatch) => {
      return { ...stopwatch, lap: [...stopwatch.lap, stopwatch.time] };
    });
  };
  return (
    <div style={{ minWidth: 300 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "row",
        }}
      >
        <p>Stopwatch</p>
      </div>
      <div className="stopwatchTime" style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, padding: "1rem" }}>
        <p className="time-label">
          {new Date(stopwatchData.time).toISOString().slice(11, -1)}
        </p>
      </div>
      <div
        className="stopwatch-controls"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem",
        }}
      >
        <button
          style={{
            background: "none",
            border: "white",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={handleStart}
        >Start</button>
         <button
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={handleStop}
        >Stop</button>
         <button
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={handleLap}
        >Lap</button>
         <button
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={handleReset}
        >Reset</button>
      </div>
      {stopwatchData.lap.length!==0&&<p className="lap-label">Laps</p>}
          <div className="lap-container">
            {stopwatchData?.lap.length > 0 &&
              stopwatchData?.lap.map((lap, index) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p>Lap {index + 1}</p>
                  <p className="lap-time-label" key={index}>
                    {new Date(lap).toISOString().slice(11, -1)}
                  </p>
                </div>
              ))}
          </div>
    </div>
  );
}
