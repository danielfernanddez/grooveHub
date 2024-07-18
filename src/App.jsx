import './App.css'
import { Login } from './components/login/login'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import { Users } from './pages/users/users'
import { Header } from './components/header/header'
import { Inicio } from './pages/inicio/inicio'
import { Footer } from './components/footer/footer'
import { useEffect, useState } from 'react'
import { Collection } from './pages/collection/collection'
import { Newsletter } from './components/newsletter/newsletter'

function App() {

  const [ showHeader, setShowHeader ]  = useState(false)
  const [ showFooter , setShowFooter ] = useState(false)
  
  useEffect(() => {
    const buscar = localStorage.getItem('login')
    const isLoggedIn = buscar !== null
    setShowHeader(isLoggedIn)
    setShowFooter(isLoggedIn)
  }, [])
    

  return (
    <BrowserRouter>
    <>
      { showHeader && <Header/>}
      <main>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/inicio' element={<Inicio/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/collection' element={<Collection/>}/>
        </Routes>
      </main>

      { showFooter && (
        <footer>
          <Newsletter/>
          <Footer/>
      </footer>
      )}

      
    </>
    </BrowserRouter>
  )
}

export default App
