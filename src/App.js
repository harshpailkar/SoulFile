import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { connect } from './lib/ipfs'

// Components
import Navigation from './components/Navigation'
import Channels from './components/Channels'

// ABIs
import SoulFile from './abis/SoulFile.json'

// Config
import config from './config.json';

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)
  const [soulfile, setSoulFile] = useState(null)

  const loadBlockchainData = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    console.log(provider)

    const network = await provider.getNetwork()
    console.log(network)

    const soulfile = new ethers.Contract(config[network.chainId].SoulFile.address, SoulFile, provider)
    setSoulFile(soulfile)

    window.ethereum.on('accountsChanged', async () => {
      window.location.reload()
    })
  }

  useEffect(() => {
    loadBlockchainData()
    // connect()
  }, [])

  return (
    <div>
      <Navigation account = {account} setAccount = {setAccount} />
      <main>
        <div>
          {console.log(account)}
          <Channels 
          provider={provider}
          account={account}
          soulfile={soulfile}/>
        </div>
      </main>
    </div>
  );
}

export default App;
