import Head from 'next/head'
import Web3Container from '../util/Web3Container'
import { useState } from 'react';

function Dapp({ web3, stats, contract }) {
  const [balance, setbalance] = useState()
  const [ethBalance, setEthBalance] = useState()

  getStats = async () => { }

  vote = async () => {
    // const balanceInWei = await web3.eth.getBalance(accounts[0])
  };

  (
    <>
      <div class="form-group">
        <label for="proposal">Candidatos</label>
        <select class="form-control" name="proposal" id="proposal">
          <option value='1'>Candidato 1</option>
          <option value='2'>Candidato 2</option>
          <option value='3'>Candidato 3</option>
        </select>
      </div>

      <button type="button" name="vote" id="vote" class="btn btn-primary" onClick={vote}>Votar</button>
    </>
  )
}

export default function Home() {
  return (
    <div className='container'>
      <Head>
        <title>Vote Decentralized App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Web3Container
        renderLoading={() => <div>Loading Dapp Page...</div>}
        render={({ web3, stats, contract }) => (
          <Dapp web3={web3} stats={stats} contract={contract} />
        )}
      />
    </div>
  )
}
