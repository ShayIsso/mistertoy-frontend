import { BrowserRouter as Router } from 'react-router'
// const Router = ReactRouterDOM.HashRouter
import { Route, Routes } from 'react-router-dom'


import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'


export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className='main-layout'>
                    <Routes>
                        <Route element={<HomePage />} path="/" />
                        <Route element={<AboutUs />} path="/about" />
                        <Route element={<ToyIndex />} path="/toy" />
                    </Routes>
                </main>
                <AppFooter />
            </section>
        </Router>
    )
}