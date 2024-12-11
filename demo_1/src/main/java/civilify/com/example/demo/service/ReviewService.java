package civilify.com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import civilify.com.example.demo.entity.ReviewEntity;
import civilify.com.example.demo.entity.ClientEntity;
import civilify.com.example.demo.entity.LawyerEntity;
import civilify.com.example.demo.repository.ReviewRepository;
import civilify.com.example.demo.repository.ClientRepository;
import civilify.com.example.demo.repository.LawyerRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepo;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private LawyerRepository lawyerRepository;

    // Method to add a new review
    public ReviewEntity postReview(ReviewEntity review, int clientId, int lawyerId) {
        ClientEntity client = clientRepository.findById(clientId)
                .orElseThrow(() -> new NoSuchElementException("Client not found"));
        LawyerEntity lawyer = lawyerRepository.findById(lawyerId)
                .orElseThrow(() -> new NoSuchElementException("Lawyer not found"));

        review.setClient(client);
        review.setLawyer(lawyer);
        
        return reviewRepo.save(review);
    }

    // Method to get all reviews
    public List<ReviewEntity> getAllReviews() {
        return reviewRepo.findAll();
    }//sd

    // Method to get reviews by lawyer ID
    public List<ReviewEntity> getReviewsByLawyerId(int lawyerId) {
        return reviewRepo.findByLawyer_LawyerId(lawyerId);
    }

    // Method to update review details
    public ReviewEntity updateReview(Long reviewId, ReviewEntity newReviewDetails) {
        ReviewEntity review = reviewRepo.findById(reviewId)
                .orElseThrow(() -> new NoSuchElementException("Review with ID " + reviewId + " not found"));

        review.setRating(newReviewDetails.getRating());
        review.setComment(newReviewDetails.getComment());
        
        return reviewRepo.save(review);
    }

    // Method to delete a review by ID
    public String deleteReview(Long reviewId) {
        if (reviewRepo.existsById(reviewId)) {
            reviewRepo.deleteById(reviewId);
            return "Review with ID " + reviewId + " successfully deleted!";
        } else {
            return "Review with ID " + reviewId + " not found!";
        }
    }
}
