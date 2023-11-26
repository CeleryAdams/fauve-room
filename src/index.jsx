import './style.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// function Loader() {
//     const { active, progress, errors, item, loaded, total } = useProgress()
//     return <Html center>{progress} % loaded</Html>
//   }

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(<App />)