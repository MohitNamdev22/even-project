import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import CardList from './CardList';

function App() {

  return (
    <>
      <div>
        <CardList />
      </div>
    </>
  )
}

export default App
