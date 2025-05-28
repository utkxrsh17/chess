import "./Pieces.css";
import Piece from "./Piece";
import { useRef } from "react";
import { useAppContext } from "../../../contexts/Context.js";
import { makeNewMove, clearCandidates } from "../../../reducer/actions/move.js";
import arbiter from "../../../arbiter/arbiter.js";

const Pieces = () => {
  const ref = useRef();

  const { appState, dispatch } = useAppContext();

  const currentPosition = appState.position[appState.position.length - 1];

  const calculateCoords = (e) => {
    const { width, left, top } = ref.current.getBoundingClientRect();
    const size = width / 8;
    const y = Math.floor((e.clientX - left) / size);
    const x = 7 - Math.floor((e.clientY - top) / size);
    return { x, y };
  };

  const onDragOver = (e) => e.preventDefault();

  const move = (e) => {
    const { x, y } = calculateCoords(e);

    const [piece, rank, file] = e.dataTransfer.getData("text").split(",");

    if (appState.candidateMoves?.find((m) => m[0] === x && m[1] === y)) {
      const newPosition = arbiter.performMove({
        position: currentPosition,
        piece,
        rank,
        file,
        x,
        y,
      });

      dispatch(makeNewMove({ newPosition }));
    }
    dispatch(clearCandidates());
  };

  const onDrop = (e) => {
    e.preventDefault();
    move(e);
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
