import './WelcomePage.css';
import React from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Appbar from '../Components/Appbar'
import { useNavigate } from 'react-router-dom'

const WelcomePage: React.FC<{name:any}> = ({name}) => {

    const navigate = useNavigate()
    const onClick = () => {
        navigate("/module-one")
    }
return (
    <div className="Container">
        <Typography variant="h2">{name}</Typography>
        <Button variant="contained" onClick={onClick}>Module One</Button>
    </div>
)

}

export default WelcomePage;