import {Route, Routes} from "react-router-dom"
import ModuleOne from './Pages/ModuleOne'
import WelcomePage from './Pages/WelcomePage'
import Appbar from './Components/Appbar'
import ModuleTwo from './Pages/ModuleTwo'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Dashboard from './Pages/Dashboard/Dashboard'
import Analysis from './AnalysisBoard/Analysis'

function App() {
    return(
        <div>
        <Appbar />
        <Routes>
            <Route path="/" element={<WelcomePage name="Welcome!"/>}/>
            <Route path="module-one" element={<ModuleOne />} />
            <Route path="module-two" element={<ModuleTwo />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analysis" element={<Analysis />} />
        </Routes>
        </div>
    )
}

export default App;