// ./src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import WeatherApp from './WeatherApp'
import * as serviceWorker from './serviceWorker'

// 這支 CSS 檔的樣式會作用到全域
import './index.css'

function App() {
  return <WeatherApp />
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// 將 unregister 改成 register
serviceWorker.register()
