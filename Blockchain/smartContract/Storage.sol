pragma solidity ^0.8.0;

contrat SimpleStorage {
	uint256 storedData;

	function set(uint256 x) public {
		storedData = x;
	}

	function get() public view returns (uint256) {
		retrun storedData;
	}
}