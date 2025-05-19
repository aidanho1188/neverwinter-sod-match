import './App.css'
import Game from './game/GameBoard' // Main game component

function App() {

  return (
    <div className="App">
      <header>
        <h1>Neverwinter SOD Match</h1>
      </header>
      <main>
        <Game />
      </main>
      <footer>
        <small>Made with React + Vite</small>
      </footer>
    </div>
  )
}

export default App
