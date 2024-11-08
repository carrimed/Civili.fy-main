package civilify.com.example.demo.controller;

import civilify.com.example.demo.entity.ReviewEntity;
import civilify.com.example.demo.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "*"})
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // Create a new review
    @PostMapping("/postReview")
    public ReviewEntity postReview(@RequestBody ReviewEntity review) {
        return reviewService.postReview(review);
    }

    // Get all reviews
    @GetMapping("/getAllReviews")
    public List<ReviewEntity> getAllReviews() {
        return reviewService.getAllReviews();
    }

    // Get reviews by client ID
   /* @GetMapping("/findByClientId")
    public List<ReviewEntity> getReviewsByClientId(@RequestParam int client_id) {
        return reviewService.getReviewsByClientId(client_id);
    } */

    // Update review details
    @PutMapping("/putReviewDetails")
    public ReviewEntity updateReview(@RequestParam int review_id, @RequestBody ReviewEntity newReviewDetails) {
        return reviewService.updateReview(review_id, newReviewDetails);
    }

    // Delete a review by ID
    @DeleteMapping("/deleteReview/{review_id}")
    public String deleteReview(@PathVariable("review_id") int review_id) {
        reviewService.deleteReview(review_id);
        return "Review with ID " + review_id + " has been deleted.";
    }
}
