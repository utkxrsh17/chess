import "./Board.css";
import Ranks from "./bits/Ranks";
import Files from "./bits/Files";
import Pieces from "../Pieces/Pieces";
import { useAppContext } from "../../contexts/Context";
import PromotionBox from "../Popup/PromotionBox/PromotionBox";
import Popup from "../Popup/Popup";
import arbiter from "../../arbiter/arbiter";
import { getKingPosition } from "../../arbiter/getMoves";
import GameEnds from "./../Popup/GameEnds/GameEnds";

const Board = () => {
  const ranks = Array(8)
    .fill()
    .map((x, i) => 8 - i);
  const files = Array(8)
    .fill()
    .map((x, i) => i + 1);

  const { appState } = useAppContext();
  const position = appState.position[appState.position.length - 1];

  const checkTile = (() => {
    const isInCheck = arbiter.isPlayerInCheck({
      positionAfterMove: position,
      player: appState.turn,
    });

    if (isInCheck) return getKingPosition({ position, player: appState.turn });

    return null;
  })();

  const getClassName = (i, j) => {
    let c = "tile";
    c += (i + j) % 2 === 0 ? " tile--dark " : " tile--light ";

    if (appState.candidateMoves?.find((m) => m[0] === i && m[1] === j)) {
      if (position[i][j]) {
        c += " attacking";
      } else {
        c += " highlight";
      }
    }
    if (checkTile && checkTile[0] === i && checkTile[1] === j) {
      c += " checked";
    }
    return c;
  };

  return (
    <div className="board">
      <Ranks ranks={ranks} />

      <div className="tiles">
        {ranks.map((rank, i) =>
          files.map((file, j) => (
            <div
              key={file + "" + rank}
              i={i}
              j={j}
              className={`${getClassName(7 - i, j)}`}
            ></div>
          ))
        )}
        <Pieces />

        <Popup>
          <PromotionBox />
          <GameEnds />
        </Popup>
      </div>

      <Files files={files} />
    </div>
  );
};
export default Board;
