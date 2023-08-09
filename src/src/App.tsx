import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';

function App() {
    return (
        <>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<LoginPage />} />
                </Routes>
            </BrowserRouter>

            <footer>
                
            </footer>
        </>
    )
}

export default App
