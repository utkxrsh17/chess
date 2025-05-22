import "./Pieces.css";
import Piece from "./Piece";
import { createPosition, copyPosition } from "../../../helper.js";
import { useState, useRef } from "react";
import { useAppContext } from "../../../contexts/Context.js";
import { makeNewMove } from "../../../reducer/actions/move.js";
const Pieces = () => {
  const ref = useRef();

  const { appState, dispatch } = useAppContext();

  const currentPosition = appState.position[appState.position.length - 1];

  const [state, setState] = useState(createPosition());

  const calculateCoords = (e) => {
    const { width, left, top } = ref.current.getBoundingClientRect();
    const size = width / 8;
    const y = Math.floor((e.clientX - left) / size);
    const x = 7 - Math.floor((e.clientY - top) / size);
    return { x, y };
  };

  const onDragOver = (e) => e.preventDefault();

  const onDrop = (e) => {
    const newPosition = copyPosition(currentPosition);
    const { x, y } = calculateCoords(e);
    const [p, rank, file] = e.dataTransfer.getData("text").split(",");
    newPosition[rank][file] = "";
    newPosition[x][y] = p;
    dispatch(makeNewMove({ newPosition }));
  };

  return (
    <div onDrop={onDrop} onDragOver={onDragOver} ref={ref} className="pieces">
      {currentPosition.map((r, rank) =>
        r.map((f, file) =>
          currentPosition[rank][file] ? (
            <Piece
              key={rank + "-" + file}
              rank={rank}
              file={file}
              piece={currentPosition[rank][file]}
            />
          ) : null
        )
      )}
    </div>
  );
};

export default Pieces;
