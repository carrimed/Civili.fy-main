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

    // Create a new review with client and lawyer IDs
    @PostMapping("/postReview")
    public ReviewEntity postReview(
            @RequestBody ReviewEntity review,
            @RequestParam int clientId,
            @RequestParam int lawyerId) {
        return reviewService.postReview(review, clientId, lawyerId);
    }

    // Get all reviews
    @GetMapping("/getAllReviews")
    public List<ReviewEntity> getAllReviews() {
        return reviewService.getAllReviews();
    }

    // Get reviews by lawyer ID
    @GetMapping("/getReviewsByLawyerId/{lawyerId}")
    public List<ReviewEntity> getReviewsByLawyerId(@PathVariable("lawyerId") int lawyerId) {
        return reviewService.getReviewsByLawyerId(lawyerId);
    }

    // Update review details
    @PutMapping("/putReviewDetails")
    public ReviewEntity updateReview(@RequestParam Long reviewId, @RequestBody ReviewEntity newReviewDetails) {
        return reviewService.updateReview(reviewId, newReviewDetails);
    }

    // Delete a review by ID
    @DeleteMapping("/deleteReview/{reviewId}")
    public String deleteReview(@PathVariable("reviewId") Long reviewId) {
        reviewService.deleteReview(reviewId);
        return "Review with ID " + reviewId + " has been deleted.";
    }
}
