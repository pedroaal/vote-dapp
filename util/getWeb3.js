import Web3 from 'web3';
import voteContractBuild from '../build/contracts/Vote.json';

let selectedAccount
let voteContract
let isInit = false

const init = async () => {
  const providerUrl = process.env.PROVIDER_URL || 'http://localhost:8545'

  // check for metamask
  let provider = window.ethereum
  if (typeof provider !== 'undefined') {
    provider
      .request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        console.log('accounts: ', accounts)
        selectedAccount = accounts[0]
      })
      .catch(err => {
        console.log(err)
        return
      })
  }
  // at wallet change
  window
    .ethereum.on('accountsChanged', accounts => {
      console.log('accounts: ', accounts)
      selectedAccount = accounts[0]
    })

  const web3 = new Web3(providerUrl)
  const networkId = await web3.eth.net.getId()
  console.log(networkId)

  voteContract = new web3.eth.Contract(
    voteContractBuild.abi,
    voteContractBuild.networks[networkId].address
  )
  console.log(voteContract)

  isInit = true
}

const vote = async ({ proposal, ci }) => {
  if (!isInit) await init()

  return voteContract
    .methods
    .vote(proposal, ci)
    .send({ from: selectedAccount })
    .then(vote => {
      return Web3.utils.fromWei(balance);
    });
}

const getWinner = async () => {
  if (!isInit) await init()

  return voteContract
    .methods
    .winnerName()
    .call()
}

const getStats = async () => {
  if (!isInit) await init()

  return voteContract
    .methods
    .getStats()
    .call()
}

export {
  init, vote, getWinner, getStats
}
