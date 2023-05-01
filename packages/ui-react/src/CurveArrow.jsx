import React, { useState } from 'react';

function CurveArrow() {
  const [startX, setStartX] = useState(50);
  const [startY, setStartY] = useState(100);
  const [controlX, setControlX] = useState(150);
  const [controlY, setControlY] = useState(50);
  const [endX, setEndX] = useState(200);
  const [endY, setEndY] = useState(0);

  const handleChange = (setter) => (e) => {
    setter(parseInt(e.target.value));
  };

  const path = `M ${startX} ${startY} q ${controlX} ${controlY}, ${endX} ${endY}`;

  return (
    <>
      <svg width="100%" height="100%">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill='white' />
          </marker>
        </defs>
        <path d={path} stroke="white" fill="none" markerEnd="url(#arrowhead)" />
        <circle cx={controlX + startX} cy={controlY + startY} r="2" fill="red"/>
      </svg>
      <form>
        <label>
          Start X:
          <input type="number" value={startX} onChange={(e) => handleChange(setStartX)(e)} />
        </label>
        <br />
        <label>
          Start Y:
          <input type="number" value={startY} onChange={(e) => handleChange(setStartY)(e)} />
        </label>
        <br />
        <label>
          Control X:
          <input type="range" min="-150" max="160" value={controlX} onChange={handleChange(setControlX)} />
          {controlX}
        </label>
        <br />
        <label>
          Control Y:
          <input type="range" min="-100" max="100" value={controlY} onChange={handleChange(setControlY)} />
          {controlY}
        </label>
        <br />
        <label>
          End X:
          <input type="number" value={endX} onChange={(e) => handleChange(setEndX)(e)} />
        </label>
        <br />
        <label>
          End Y:
          <input type="number" value={endY} onChange={(e) => handleChange(setEndY)(e)} />
        </label>
      </form>
    </>
  );
}

export default CurveArrow;
