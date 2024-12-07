// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./HotelReviewSystem.sol";

/**
 * @title TLSNotaryOracle
 * @dev Oracle contract for verifying TLSNotary proofs
 */
contract TLSNotaryOracle is Ownable {
    HotelReviewSystem public reviewSystem;
    
    // Mapping to track processed verification hashes
    mapping(string => bool) public processedHashes;
    
    event VerificationProcessed(
        string verificationHash,
        bool success,
        uint256 timestamp
    );

    constructor(address reviewSystemAddress) Ownable(msg.sender) {
        reviewSystem = HotelReviewSystem(reviewSystemAddress);
    }

    /**
     * @dev Process TLSNotary verification
     * @param reviewId Review identifier
     * @param verificationHash Hash of the TLSNotary proof
     */
    function processVerification(
        uint256 reviewId,
        string calldata verificationHash
    ) external onlyOwner {
        require(!processedHashes[verificationHash], "Hash already processed");
        
        // In production, this would verify the TLSNotary proof
        // For now, we'll just mark it as processed
        processedHashes[verificationHash] = true;
        
        // Verify the review in the main contract
        reviewSystem.verifyReview(reviewId);
        
        emit VerificationProcessed(
            verificationHash,
            true,
            block.timestamp
        );
    }

    /**
     * @dev Update review system contract address
     * @param newAddress New contract address
     */
    function updateReviewSystem(address newAddress) external onlyOwner {
        reviewSystem = HotelReviewSystem(newAddress);
    }
}