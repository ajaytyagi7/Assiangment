import './App.css'
import { BrowserRouter,Routes,Route, NavLink,Link } from 'react-router-dom'
import Navbar from './Component/Navbar'
import Home from './Component/Home'
import { SnackbarProvider } from 'notistack';


function App() {

  return (
    <>
     <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
    <BrowserRouter>
    <Navbar/>
    <Routes>

       <Route path='Home' element={<Home/>}/>
       <Route path='/' element={<Home/>}/>





      


    </Routes>
    </BrowserRouter>
    </SnackbarProvider>
    </>
  )
}

export default App
