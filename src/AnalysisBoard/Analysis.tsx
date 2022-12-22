import React, { useState } from "react";
import './Analysis.css'
import Chessground from "@react-chess/chessground"
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { Chess } from 'chess.js';
import Typography from '@mui/material/Typography';
import Notation from '../Components/Notation'


const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const chess = new Chess(startingFen);
let orientationColor = chess.turn();
let fenNoUpdate = startingFen;
let history = {};
let move=1;
let legalMove = false;

const Analysis: React.FC = () => {
    let props = {
        move: move,
        history: history,
        legalMove: legalMove
    }
    
    const[runFrame, runThatFrame] = useState(true);

    const handleMove = (one: string, two: string) => {
        let NewMove = chess.move({from: one, to: two})
        fenNoUpdate = chess.fen();
        history = chess.history()
        if(NewMove!=null) {
        legalMove=true;
        move++;
        }
        else {
        legalMove=false;
        }
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
        <div className="item" id="item2">
        {move>1 ? <Notation {...props}/> : null}

        </div>
      </div>
    </div>
    )
}

export default Analysis;