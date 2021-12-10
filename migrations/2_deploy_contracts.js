const Vote = artifacts.require('./Vote.sol')
const Proposals = ['Candidato 1', 'Candidato 2', 'Candidato 3']

module.exports = function (deployer) {
  deployer.deploy(Vote, Proposals)
}