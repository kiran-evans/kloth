import { useContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AppContext } from './components/ContextProvider';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { ProductPage } from './pages/ProductPage';

function App() {

    const { state } = useContext(AppContext);
    const [selectedCategory, setSelectedCategory] = useState("all");

    return (
        <BrowserRouter>
            <Header selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            
            <div id="mainContainer">
                <Routes>
                    <Route path='/' element={<MainPage selectedCategory={selectedCategory} />} />
                    <Route path='/login' element={state.user ? <Navigate to="/" /> : <LoginPage />} />
                    <Route path='/product/:id' element={<ProductPage />} />
                </Routes>

                <footer>
                    Footer
                </footer>
            </div>
        </BrowserRouter>
    )
}

export default App
