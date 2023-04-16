import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { connect } from './lib/ipfs'

// Components
import Navigation from './components/Navigation'
import Channels from './components/Channels'


// Config
import config from './config.json';

function App() {

  const [account, setAccount] = useState(null)

  const loadBlockchainData = async () => {
    window.ethereum.on('accountsChanged', async () => {
      window.location.reload()
    })
  }

  useEffect(() => {
    connect()
  }, [])

  return (
    <div>
      <Navigation account = {account} setAccount = {setAccount} />
      <main>
        <div>
          <Channels/>
        </div>
      </main>
    </div>
  );
}

export default App;
