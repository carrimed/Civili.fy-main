package civilify.com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import civilify.com.example.demo.entity.ReviewEntity;
import civilify.com.example.demo.repository.ReviewRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepo;

    // Method to add a new review
    public ReviewEntity postReview(ReviewEntity review) {
        return reviewRepo.save(review);
    }

    // Method to get all reviews
    public List<ReviewEntity> getAllReviews() {
        return reviewRepo.findAll();
    }

    // Method to get reviews by client ID
    public List<ReviewEntity> getReviewsByClientId(int client_id) {
        return reviewRepo.findByClientId(client_id);
    }

    // Method to get reviews by lawyer ID
    public List<ReviewEntity> getReviewsByLawyerId(int lawyer_id) {
        return reviewRepo.findByLawyerId(lawyer_id);
    }

    // Method to update review details
    public ReviewEntity updateReview(int review_id, ReviewEntity newReviewDetails) {
        ReviewEntity review = reviewRepo.findById(review_id).orElseThrow(() -> 
            new NoSuchElementException("Review with ID " + review_id + " not found."));

        review.setRating(newReviewDetails.getRating());
        review.setComment(newReviewDetails.getComment());
        return reviewRepo.save(review);
    }

    // Method to delete a review by ID
    public String deleteReview(int review_id) {
        if (reviewRepo.existsById(review_id)) {  // Check if the review exists
            reviewRepo.deleteById(review_id);    // Delete the review
            return "Review with ID " + review_id + " successfully deleted!";
        } else {
            return "Review with ID " + review_id + " not found!";
        }
    }
}
