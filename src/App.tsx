import "./App.css";
import React, { useState } from "react";
import Chessground from "@react-chess/chessground"
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { ShortMove } from "../node_modules/@types/chess.js";
import { Chess } from 'chess.js';
import { findConfigFile } from "typescript";

//defines fenNoUpdate where it won't repeatedly go back to start
const startingFen = "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP4/5NP1/PP2PPBP/RNBQ1RK1 b - c3 0 6"
const chess = new Chess(startingFen);
let fenNoUpdate = startingFen;

const App: React.FC = () => {

const[runFrame, runThatFrame] = useState(true);

const handleMove = (one: string, two: string) => {
  let NewMove = chess.move({from: one, to: two})
  fenNoUpdate = chess.fen();
  runThatFrame(!runFrame);
  if(NewMove!=null) {
 if(NewMove.from=='e7' && NewMove.to=='e6') {
    console.log("you are correct!")
  }
  else {
    console.log("you're incorrect. try again.")
  }
}
  };  

  return (

    <div className="flex-center">
      <Chessground
        width={400}
        height={400}
        config = {{
          fen:  fenNoUpdate,
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