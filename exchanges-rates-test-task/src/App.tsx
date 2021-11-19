import React, { Fragment, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Navbar } from './components/navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import { FirstCurrencyWrapper } from './components/firstCurrencyWrapper/FirstCurrencyWrapper';


const ConvertingCurrency = React.lazy(() => import("./components/convertingCurrency/ConvertingCurrenc.jsx"))
const ExchangesRates = React.lazy(() => import("./components/exchangesRates/ExchangesRates"))

const App = () => {
  return (
    <div className='app-wrapper'>
      <FirstCurrencyWrapper>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={
              <ExchangesRates />
            } />
            <Route path="/converter" element={<ConvertingCurrency />} />
          </Routes>
        </Suspense>
        <Navbar />
      </FirstCurrencyWrapper>
    </div>
  );
}

export default App;
