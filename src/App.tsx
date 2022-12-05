import "./App.css";
import React, { useState, useEffect } from "react";
import Chessground from "@react-chess/chessground"
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { ShortMove } from "../node_modules/@types/chess.js";
import { Chess } from 'chess.js';
import { findConfigFile } from "typescript";

const App: React.FC = () => {

const[fren, setFren] = useState("rnbqk1nr/ppp1ppb1/6p1/3p3p/3P1P2/6PP/PPP1P1B1/RNBQK1NR b KQkq f3 0 5");
const chess = new Chess(fren);
const handleMove = (from: string, to: string) => {
  // chess.move({from, to});
  // setFren(chess.fen())
  let newMove = chess.move({from, to});

  if(newMove==null) {  
    setFren(chess.fen());
  }

  else {
    chess.move({from, to})
}
  };  

  return (
    console.log(fren + "this is the fren that's playing"),
    <div className="flex-center">
      <Chessground
        width={400}
        height={400}
        config = {{
          fen: fren,
          movable: {
            
          },
          events: {
            move: (orig, dest) => handleMove(
            orig, dest)
          }
        }}
      />
      
    </div>
  );
};

export default App;