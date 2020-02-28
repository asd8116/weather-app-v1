// ./src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import WeatherApp from './WeatherApp'

// 這支 CSS 檔的樣式會作用到全域
import './index.css'

function App() {
  return <WeatherApp />
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
