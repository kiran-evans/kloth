import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AppContext } from './components/ContextProvider';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';

function App() {

    const { state } = useContext(AppContext);

    return (
        <BrowserRouter>
            <Header />
            
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/login' element={state.user ? <Navigate to="/" /> : <LoginPage />} />
            </Routes>

            <footer>
                
            </footer>
        </BrowserRouter>
    )
}

export default App
