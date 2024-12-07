// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title HotelReviewSystem
 * @dev Main contract for managing verified hotel reviews as NFTs
 */
contract HotelReviewSystem is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _reviewIds;

    struct Review {
        uint256 id;
        address reviewer;
        string hotelId;
        uint8 rating;
        string reviewText;
        string bookingProof; // Booking confirmation reference
        uint256 timestamp;
    }

    // Mappings
    mapping(uint256 => Review) public reviews;
    mapping(string => uint256[]) public hotelReviews;
    mapping(address => uint256[]) public userReviews;

    // Events
    event ReviewMinted(
        uint256 indexed reviewId,
        address indexed reviewer,
        string indexed hotelId,
        uint8 rating,
        uint256 timestamp
    );

    constructor() ERC721("TrustStayReview", "TSR") Ownable(msg.sender) {}

    /**
     * @dev Submit a new review and mint it as an NFT
     * @param hotelId Hotel identifier
     * @param rating Rating from 1 to 5
     * @param reviewText Review content
     * @param bookingProof Booking confirmation reference
     */
    function mintReview(
        string calldata hotelId,
        uint8 rating,
        string calldata reviewText,
        string calldata bookingProof
    ) external nonReentrant {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        require(bytes(reviewText).length > 0, "Review text cannot be empty");
        require(bytes(bookingProof).length > 0, "Booking proof required");

        _reviewIds.increment();
        uint256 newReviewId = _reviewIds.current();

        Review memory newReview = Review({
            id: newReviewId,
            reviewer: msg.sender,
            hotelId: hotelId,
            rating: rating,
            reviewText: reviewText,
            bookingProof: bookingProof,
            timestamp: block.timestamp
        });

        reviews[newReviewId] = newReview;
        hotelReviews[hotelId].push(newReviewId);
        userReviews[msg.sender].push(newReviewId);

        _safeMint(msg.sender, newReviewId);

        emit ReviewMinted(
            newReviewId,
            msg.sender,
            hotelId,
            rating,
            block.timestamp
        );
    }

    /**
     * @dev Get all review IDs for a hotel
     * @param hotelId Hotel identifier
     */
    function getHotelReviews(string calldata hotelId) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return hotelReviews[hotelId];
    }

    /**
     * @dev Get all review IDs for a user
     * @param user User address
     */
    function getUserReviews(address user) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return userReviews[user];
    }

    /**
     * @dev Get review details
     * @param reviewId Review identifier
     */
    function getReview(uint256 reviewId)
        external
        view
        returns (
            address reviewer,
            string memory hotelId,
            uint8 rating,
            string memory reviewText,
            string memory bookingProof,
            uint256 timestamp
        )
    {
        Review memory review = reviews[reviewId];
        require(review.id != 0, "Review does not exist");
        
        return (
            review.reviewer,
            review.hotelId,
            review.rating,
            review.reviewText,
            review.bookingProof,
            review.timestamp
        );
    }

    /**
     * @dev Override tokenURI to return review metadata
     * @param tokenId Token identifier
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        _requireOwned(tokenId);
        
        // In production, this would return IPFS/Arweave URI with review metadata
        return string(abi.encodePacked(
            "https://api.truststay.com/review/",
            toString(tokenId)
        ));
    }

    // Helper function to convert uint to string
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}