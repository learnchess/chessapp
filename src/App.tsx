import "./App.css";
import React, { useState } from "react";
import Chessground from "@react-chess/chessground"
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { ShortMove } from "../node_modules/@types/chess.js";
import { Chess } from 'chess.js';
import { findConfigFile } from "typescript";
import Button from '@mui/material/Button';
//https://surge.sh/
//start - rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
//cool puzzle white to move - 2r1k2r/4bppp/p2p1n2/1p2pP2/2q1P3/1N3R2/1PPR2PP/2B1Q2K w k - 0 3
const startingFen = "2r1k2r/4bppp/p2p1n2/1p2pP2/2q1P3/1N3R2/1PPR2PP/2B1Q2K w k - 0 3"
const chess = new Chess(startingFen);
let fenNoUpdate = startingFen;
let puzzleStatus=0;
let move=1;
//in a puzzle, you have fen, numMoves, firstCorrectMove(from, to), secondCorrectMove(from,to)...numMovesCorrectMove(from, to)
const App: React.FC = () => {

const[runFrame, runThatFrame] = useState(true);
const[showButton1, setShowButton1] = useState(false);
const[showButton2, setShowButton2] = useState(false);

const Button1 = () => (
  <div className="button">
  <Button variant="contained" onClick={onClickButton1}>Continue</Button>
</div>
)

const Button2 = () => (
  <div className="button">
  <Button variant="contained" onClick = {onClickButton2}>Try Again.</Button>
</div>
)

const onClickButton1 = () => {
  if(puzzleStatus===0) {
    fenNoUpdate="1k2r3/1p4p1/pPqp2Q1/3p4/n7/5N1P/5PP1/R5K1 w - - 2 31";
  }
  else if(puzzleStatus===1) {
    fenNoUpdate="2b4k/2q2prp/1bp2Q1N/pp2p2P/4n3/P5P1/BPP4K/1N1R1R2 b - - 1 25";
  }
    chess.load(fenNoUpdate);
    puzzleStatus++;
    move=1;
    setShowButton1(false);
}

const onClickButton2 = () => {
  chess.undo();
  fenNoUpdate = chess.fen();
  setShowButton2(false)
}

const createTwoMovePuzzle = (NewMove: any, from1: string, to1: string, from2: string, to2: string, from3: string, to3: string) => {
  if(move==1) {
    if(NewMove.from===from1 && NewMove.to===to1) {
       // setShowButton1(true);
       chess.move({from: from2, to: to2});
       fenNoUpdate = chess.fen();
       move++;
       runThatFrame(!runFrame);
     }
     else {
       setShowButton2(true);
     }
   }
   else if(move==2) {
     if(NewMove.from===from3 && NewMove.to===to3) {
       setShowButton1(true);
     }
     else {
       setShowButton2(true);
     }
   }
}

const createPuzzle0 = (NewMove: any) => {
  createTwoMovePuzzle(NewMove, 'f3', 'c3', 'c4', 'c3', 'b2', 'c3')
}

const createPuzzle1 = (NewMove: any) => {
  if(NewMove.from==='f3' && NewMove.to==='d4') {
    setShowButton1(true);
  }
  else {
    setShowButton2(true);
  }
}

const createPuzzle2 = (NewMove: any) => {
  if(NewMove.from==='e4' && NewMove.to==='f6') {
    setShowButton1(true);
  }
  else {
    setShowButton2(true);
  }
}

const handleMove = (one: string, two: string) => {
  let NewMove = chess.move({from: one, to: two})
  fenNoUpdate = chess.fen();
  runThatFrame(!runFrame);
  if(NewMove!=null) {
    if(puzzleStatus===0) {
      createPuzzle0(NewMove);
}
else if(puzzleStatus===1) {
    createPuzzle1(NewMove);
}
else if(puzzleStatus===2) {
    createPuzzle2(NewMove);
}
}
  };  

  return (

    <div>
      { showButton1 ? <Button1 /> : null}
      { showButton2 ? <Button2 /> : null}
      <div className = "flex-center">
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
    </div>
  );
};

export default App;