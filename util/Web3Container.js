import { useState, useEffect } from 'react';
import getWeb3 from './getWeb3'
import getContract from './getContract'
import contractDefinition from '../build/contracts/Vote.json'

export default function Web3Container({ render, renderLoading }) {
  const [web3, setWeb3] = useState()
  const [accounts, setAccounts] = useState()
  const [contract, setContract] = useState()

  useEffect(async () => {
    try {
      const web3_res = await getWeb3()
      const accounts_res = await web3.eth.getAccounts()
      const contract_res = await getContract(web3, contractDefinition)

      setWeb3(web3_res)
      setAccounts(accounts_res)
      setContract(contract_res)
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`)
      console.log(error)
    }
  }, [])

  return (
    <>
      {
        web3 && accounts
          ? render({ web3, accounts, contract })
          : renderLoading()
      }
    </>
  )
}