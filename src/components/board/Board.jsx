import { getCharacter } from "../../helper";
import "./Board.css";
import Files from "./bits/Files";
import Ranks from "./bits/Ranks";
const Board = () => {
  const getClassName = (i, j) => {
    let c = "tile";
    c += (i + j) % 2 === 0 ? " tile--light" : " tile--dark";
    return c;
  };

  const ranks = Array(8)
    .fill()
    .map((x, i) => 8 - i);
  const files = Array(8)
    .fill()
    .map((x, i) => getCharacter(i));

  return (
    <div className="board">
      <div style={{ gridArea: "ranks" }}>
        <Ranks ranks={ranks} />
      </div>
      <div className="tiles" style={{ gridArea: "tiles" }}>
        {ranks.map((rank, i) =>
          files.map((file, j) => (
            <div key={file + "-" + rank} className={getClassName(i, j)}></div>
          ))
        )}
      </div>
      <div style={{ gridArea: "files" }}>
        <Files files={files} />
      </div>
    </div>
  );
};

export default Board;
