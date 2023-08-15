import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AppContext } from './components/ContextProvider';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';

function App() {

    const { state } = useContext(AppContext);

    return (
        <BrowserRouter>
            <Header />
            
            <Routes>
                <Route path='/login' element={!state.user && <LoginPage />} />
            </Routes>

            <footer>
                
            </footer>
        </BrowserRouter>
    )
}

export default App
