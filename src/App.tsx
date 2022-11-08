// import React, { useState } from "react";
// import "./App.css";
// import Chessboard from "chessboardjsx";
// import { ChessInstance, ShortMove } from "../node_modules/@types/chess.js";
// import { Chess } from 'chess.js';


// const App: React.FC = () => {
//   const chess = new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKRNR w KQkq - 0 1");

//   const [fen, setFen] = useState(chess.fen());

//   const handleMove = (move: ShortMove) => {
//     console.log("dropped")
//     if (chess.move(move)) {
//       setTimeout(() => {
//         const moves = chess.moves();

//         if (moves.length > 0) {
//           const computerMove = moves[Math.floor(Math.random() * moves.length)];
//           chess.move(computerMove);
//           setFen(chess.fen());
//         }
//       }, 300);

//       setFen(chess.fen());
//     }
//   };

//   return (
//     <div className="flex-center">
//       <h1>Random Chess</h1>
//       <Chessboard
//         width={400}
//         position="start"
//         onDrop={(move) =>
//           handleMove({
//             from: move.sourceSquare,
//             to: move.targetSquare,
//             promotion: "q",
//           })
//         }
//       />
//     </div>
//   );
// };

// export default App;

import "./App.css";
import Chessboard from "chessboardjsx";

const App: React.FC = () => {

  return (
    <div className="flex-center">
      <Chessboard
      position = "start"
      />
    </div>
  );
};

export default App;