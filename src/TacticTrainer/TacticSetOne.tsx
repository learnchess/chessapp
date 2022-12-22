import "./TacticSet.css"
import React, { useState } from "react";
import Chessground from "@react-chess/chessground"
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { Chess } from 'chess.js';
import { createNoSubstitutionTemplateLiteral, findConfigFile } from "typescript";

//mui imports
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//https://surge.sh/

//routinify
//puzzle 1
const FirstPuzzleFen = "2r1k2r/4bppp/p2p1n2/1p2pP2/2q1P3/1N3R2/1PPR2PP/2B1Q2K w k - 0 3";

//puzzle 2
const SecondPuzzleFen = "1k2r3/1p4p1/pPqp2Q1/3p4/n7/5N1P/5PP1/R5K1 w - - 2 31";

//puzzle 3
const ThirdPuzzleFen = "2b4k/2q2prp/1bp2Q1N/pp2p2P/4n3/P5P1/BPP4K/1N1R1R2 b - - 1 25";

//puzzle 4
const FourthPuzzleFen = "r4Bk1/3r1p1p/p4PpQ/q1p1p3/3nN3/1P1P4/1PP2RPP/6K1 b - - 1 28";

//puzzle 5
const FifthPuzzleFen = "r3k2r/1q5p/2p2pp1/3p1pP1/p2P1P2/b1KBP3/P3Q1P1/1N2RR2 b kq - 0 29";

//variables that i don't want to update each time App returns

const startingFen = FirstPuzzleFen
const chess = new Chess(startingFen);
let orientationColor = chess.turn();
let fenNoUpdate = startingFen;
let puzzleStatus=0;
let move=1;

//procedure for making this work for a new puzzle:
// 1. add to onClickButton1 an else if(puzzleStatus===lastStaus + 1) with the new puzzle's fen
// 2. add a createPuzzleX with the appropriate amount of moves and configurations
// 3. add to handleMove, else if puzzleStatus = X, run createPuzzleX. You're done!
const TacticSetOne: React.FC = () => {

    //run Create Puzzle Function with num moves, enter correct string of moves
  const createPuzzle0 = (NewMove: any) => {
    createTwoMovePuzzle(NewMove, 'f3', 'c3', 'c4', 'c3', 'b2', 'c3')
  }
  
  const createPuzzle1 = (NewMove: any) => {
  createOneMovePuzzle(NewMove, 'f3', 'd4')
  }
  
  const createPuzzle2 = (NewMove: any) => {
  createOneMovePuzzle(NewMove, 'e4', 'f6')
  }
  
  const createPuzzle3 = (NewMove: any) => {
    createThreeMovePuzzle(NewMove, 'a5', 'e1', 'f2', 'f1', 'd4', 'e2', 'g1', 'h1', 'e1', 'f1')
  }
  
  const createPuzzle4 = (NewMove: any) => {
    createThreeMovePuzzle(NewMove, 'b7', 'b4', 'c3', 'c2', 'b4', 'b2', 'c2', 'd1', 'b2', 'c1')
  }

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
    fenNoUpdate=SecondPuzzleFen;

  }
  else if(puzzleStatus===1) {
    fenNoUpdate=ThirdPuzzleFen;
  }
  else if(puzzleStatus===2) {
    fenNoUpdate=FourthPuzzleFen;
  }

  else if(puzzleStatus===3) {
    fenNoUpdate=FifthPuzzleFen;
  }

  else if(puzzleStatus===4) {

    return;
  }

    chess.load(fenNoUpdate);
    orientationColor = chess.turn();
    puzzleStatus++;
    move=1;
    setShowButton1(false);
}

const onClickButton2 = () => {
  chess.undo();
  fenNoUpdate = chess.fen();
  setShowButton2(false)
}
const createOneMovePuzzle = (NewMove: any, from1: string, to1: string) => {
  if(NewMove.from===from1 && NewMove.to===to1) {
    setShowButton1(true);
  }
  else {
    setShowButton2(true);
  }
}

const createTwoMovePuzzle = (NewMove: any, from1: string, to1: string, from2: string, to2: string, from3: string, to3: string) => {
  if(move===1) {
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
   else if(move===2) {
     if(NewMove.from===from3 && NewMove.to===to3) {
       setShowButton1(true);
     }
     else {
       setShowButton2(true);
     }
   }
}

const createThreeMovePuzzle = (NewMove: any, from1: string, to1: string, from2: string, to2: string, from3: string, to3: string, from4: string, to4: string, from5: string, to5: string) => {
  console.log("made it here")
  if(move===1) {
    if(NewMove.from===from1 && NewMove.to===to1) {
       chess.move({from: from2, to: to2});      
       fenNoUpdate = chess.fen();
       move++;
       runThatFrame(!runFrame);
     }
     else {
       setShowButton2(true);
     }
   }
   else if(move===2) {
     if(NewMove.from===from3 && NewMove.to===to3) {
      chess.move({from: from4, to: to4});      
      fenNoUpdate = chess.fen();
      move++;
      runThatFrame(!runFrame);
     }
     else {
       setShowButton2(true);
     }
   }
   else if(move===3) {
    if(NewMove.from===from5 && NewMove.to===to5) {
      setShowButton1(true);
    }
    else {
      setShowButton2(true);
    }
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
else if(puzzleStatus===3) {
  createPuzzle3(NewMove);
}

else if(puzzleStatus===4) {
  createPuzzle4(NewMove);
}
}
  };  

  return (
    <div className="container">
        <div className="item">
      <Chessground
        width={400}
        height={400}
        config = {{
          fen:  fenNoUpdate,
          orientation: orientationColor==='w' ? "white" : "black",
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

        <div>
        { showButton1 ? <Button1 /> : null}
        { showButton2 ? <Button2 /> : null}
        </div>
      </div>
    </div>
  );
};

export default TacticSetOne;