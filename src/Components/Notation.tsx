interface CustomComponentProps {
    move: number;
    history: any;
    legalMove: boolean;
 }
 let text = "";
const Notation = (props:CustomComponentProps) => {
    
        if(props.legalMove) {
            if(props.move>2) {
                if(props.move%2===0) {
                    text+= " " + (props.move/2) + ". " + props.history[props.move-2]
                }
                else {
                text+= " " + props.history[props.move-2]
                }
        }
        else {
                text+= props.move-1 + ". " + props.history[props.move-2]
        }
        }

    return (
        <div>
        <h2>{text}</h2>
      </div>
    )
}

export default Notation;