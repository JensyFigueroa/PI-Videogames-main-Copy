import {Routes, Route, useLocation} from 'react-router-dom'
import Games from './componets/VideoGames/VideoGames.jsx';
import LandingPage from './componets/landing/LandingPage.jsx';
import Details from './componets/details/Detail';
import CreateGame from './componets/createGame/CreateGame.jsx';
import Navbar from './componets/navbar/Navbar.jsx';
import About from './componets/about/About.jsx';
import Footer from './componets/footer/Footer.jsx';

function App() {
  const location = useLocation()
  return (
    <div className="App">

{location.pathname !== '/' && <Navbar/>}

   <Routes>
      <Route exact path='/' element={<LandingPage/>}/>
      <Route exact path='/videogames' element={<Games/>}/>
      <Route exact path='/about' element={<About/>}/>
      <Route exact path='/detail/:id' element={<Details/>}/>
      <Route exact path='/createGame' element={<CreateGame/>}/>
   </Routes>

{location.pathname !== '/' && <Footer/>}
    
    </div>
  );
}

export default App;
