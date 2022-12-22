import React, { useState } from "react";
import './Analysis.css'
import Chessground from "@react-chess/chessground"
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { Chess } from 'chess.js';
import Typography from '@mui/material/Typography';

const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const chess = new Chess(startingFen);
chess.loadPgn(
    "1. e4 e5 {king's pawn opening} 2. Nf3 Nc6 3. Bc4 Bc5 {giuoco piano} *"
  )
let orientationColor = chess.turn();
let fenNoUpdate = startingFen;

const Analysis: React.FC = () => {

    const[runFrame, runThatFrame] = useState(true);

    const handleMove = (one: string, two: string) => {
        let NewMove = chess.move({from: one, to: two})
        fenNoUpdate = chess.fen();
        runThatFrame(!runFrame);
    }

    return (
        <div className="container">
        <div className="item">
      <Chessground
        width={400}
        height={400}
        config = {{
          fen:  fenNoUpdate,
        //   orientation: orientationColor==='w' ? "white" : "black",
          events: {
            move: (orig, dest) => handleMove(
            orig, dest)
          }
        }}
      />
      </div>
      <div className = "button-text">

        <div className="item">
        {orientationColor==='w' ? <Typography variant="h3">White To Move</Typography > : <Typography variant="h3">Black To Move</Typography>}
        </div>
        <div className="item">
        <Typography variant="h2">{chess.pgn()}</Typography>
        </div>
      </div>
    </div>
    )
}

export default Analysis;