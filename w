pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    struct Voter {
        bool isRegistered;
        string name;
    }

    Candidate[] public candidates;
    address public owner;
    mapping(address => Voter) public voters; 
    mapping(address => bool) public hasVoted; 

    uint256 public StartTime;
    uint256 public EndTime;
    uint256 private candidateIdCounter;

    modifier OnlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyRegisteredVoter() {
        require(voters[msg.sender].isRegistered, "You must be a registered voter.");
        _;
    }

    modifier onlyOnce() {
        require(!hasVoted[msg.sender], "You have already voted.");
        _;
    }

    constructor(string[] memory candidateNames, uint256 durationEndMinute) {
        for (uint256 i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({
                id: candidateIdCounter++, 
                name: candidateNames[i], 
                voteCount: 0
            }));
        }

        owner = msg.sender;
        StartTime = block.timestamp;
        EndTime = block.timestamp + (durationEndMinute * 1 minutes);
    }


    function addCandidate(string memory _name) public OnlyOwner {
        candidates.push(Candidate({
            id: candidateIdCounter++, 
            name: _name, 
            voteCount: 0
        }));
    }


    function registerVoter(string memory _name) public {
        require(!voters[msg.sender].isRegistered, "You are already registered.");
        voters[msg.sender] = Voter({
            isRegistered: true,
            name: _name
        });
    }


    function vote(uint256 id) public onlyRegisteredVoter onlyOnce {
        require(block.timestamp >= StartTime && block.timestamp <= EndTime, "Voting time over");

        bool candidateFound = false;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].id == id) {
                candidateFound = true;
                candidates[i].voteCount += 1;  
                break;
            }
        }

        require(candidateFound, "No candidate found with the given ID");
        hasVoted[msg.sender] = true;
    }

    
    function getAll() public view returns(Candidate[] memory) {
        return candidates;
    }

   
    function getWinner() public view returns (string memory name) {
        uint256 highestVote = 0;
        uint256 winnerIndex = 0;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > highestVote) {
                highestVote = candidates[i].voteCount;
                winnerIndex = i;
            }
        }

        return candidates[winnerIndex].name;
    }

 
    function getTotalVotes(uint256 id) public view returns (uint256) {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].id == id) {
                return candidates[i].voteCount;
            }
        }
        revert("Candidate not found");
    }

   
    function getRemainingTime() public view returns(uint256) {
        require(block.timestamp >= StartTime, "Voting has not started yet");

        if (block.timestamp > EndTime) {
            return 0; 
        }

        return EndTime - block.timestamp;
    }
}
