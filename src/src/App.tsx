import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';

function App() {
    return (
        <>
            <Header />

            <main>
                <BrowserRouter>
                    <Routes>
                        <Route path='/login' element={<LoginPage />} />
                    </Routes>
                </BrowserRouter>                
            </main>

            <footer>
                
            </footer>
        </>
    )
}

export default App
