import { useState } from 'react'
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from "wagmi";
import { mainnet } from 'wagmi/chains';

import './App.css'
import FlashcardPage from './components/Pages/FlashcardPage'
import SetPage from './components/Pages/SetPage'
import HomePage from './components/Pages/HomePage'
import CreateSetPage from './components/Pages/CreateSetPage';
import LearnPage from './components/Pages/LearnPage';
import QuizPage from './components/Pages/QuizPage';

import LoginPage from './components/Middleware/LoginPage';
import LoadPage from './components/Middleware/LoadPage';

import SSXWatchProvider from './components/SSXWatchProvider';

const projectId = import.meta.env.VITE_PROJECT_ID;
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}
const chains = [mainnet]
const wagmiConfig = defaultWagmiConfig({
  chains, projectId, metadata, themeMode: 'dark', themeVariables: {
    '--w3m-accent	': '#000000',
    '--w3m-color-mix': '#00BB7F',
    '--w3m-color-mix-strength': 40
  }
})
createWeb3Modal({ wagmiConfig, projectId, chains })

const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />,

  },
  {
    path: '/create',
    element: <LoginPage><CreateSetPage /></LoginPage>,
  },
  {
    path: '/sets/:setHash/learn',
    element: <LoginPage><LoadPage><LearnPage /></LoadPage></LoginPage>,
  },
  {
    path: '/sets/:setHash/flashcards',
    element: <LoginPage><LoadPage><FlashcardPage /></LoadPage></LoginPage>,
  },
  {
    path: '/sets/:setHash/quiz',
    element: <LoginPage><LoadPage><QuizPage /></LoadPage></LoginPage>,
  },
  {
    path: '/sets/:setHash',
    element: <LoginPage><LoadPage><SetPage /></LoadPage></LoginPage>,
    errorElement: <HomePage />,
  },
]);

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <SSXWatchProvider>
        <RouterProvider router={router} />
      </SSXWatchProvider>
    </WagmiConfig>
  )
}

export default App
