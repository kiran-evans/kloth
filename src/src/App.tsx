import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AppContext } from './components/ContextProvider';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';

function App() {

    const { state } = useContext(AppContext);

    return (
        <BrowserRouter>
            <Header />
            
            <Routes>
                <Route path='/login' element={!state.user && <LoginPage />} />
                <Route path='/signup' element={!state.user && <SignUpPage />} />
            </Routes>

            <footer>
                
            </footer>
        </BrowserRouter>
    )
}

export default App
