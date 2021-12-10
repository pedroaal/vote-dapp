// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract Vote {
    
    struct Voter {
        uint ci;
        bool voted;
    }

    struct Proposal {
        string name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }

    mapping(uint => Voter) public voters;

    Proposal[] public proposals;

    constructor(string[] memory proposalNames) {
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(
                Proposal({
                    name: proposalNames[i],
                    voteCount: 0
                })
            );
        }
    }

    function vote(uint _proposal, uint _ci) public {
        Voter storage sender = voters[_ci];
        require(!sender.voted, "Already voted.");
        sender.ci = _ci;
        sender.voted = true;
        proposals[_proposal].voteCount += 1;
    }

    /** 
     * @dev Computes the winning proposal taking all previous votes into account.
     * @return winningProposal_ index of winning proposal in the proposals array
     */
    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    /** 
     * @dev Calls winningProposal() function to get the index of the winner contained in the proposals array and then
     * @return winnerName_ the name of the winner
     */
    function winnerName() public view returns (string memory winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }

    function giveStats() public view returns (Proposal[] memory proposals_) {
        return proposals;
    }
}

