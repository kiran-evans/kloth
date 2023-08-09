import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AppContext } from './components/ContextProvider';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';

function App() {

    const { user } = useContext(AppContext);

    return (
        <>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={user ? <Navigate to="/" /> : <LoginPage />} />
                </Routes>
            </BrowserRouter>

            <footer>
                
            </footer>
        </>
    )
}

export default App
