package civilify.com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
@Table(name = "REVIEW")
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewId;

    @Column(nullable = false)
    private int clientId; // Now using an int for client ID

    @Column(nullable = false)
    private int lawyerId; // Now using an int for lawyer ID

    @Column(nullable = false)
    private int rating; // Rating given in review

    private String comment; // Review comment

    // Default constructor
    public ReviewEntity() {
        super();
    }

    // Parameterized constructor
    public ReviewEntity(int clientId, int lawyerId, int rating, String comment) {
        this.clientId = clientId; // Set client ID
        this.lawyerId = lawyerId; // Set lawyer ID
        this.rating = rating; // Set rating
        this.comment = comment; // Set comment
    }

    // Getters and Setters
    public int getReviewId() {
        return reviewId;
    }

    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }

    public int getClientId() {
        return clientId; // Return client ID
    }

    public void setClientId(int clientId) {
        this.clientId = clientId; // Set client ID
    }

    public int getLawyerId() {
        return lawyerId; // Return lawyer ID
    }

    public void setLawyerId(int lawyerId) {
        this.lawyerId = lawyerId; // Set lawyer ID
    }

    public int getRating() {
        return rating; // Return rating
    }

    public void setRating(int rating) {
        this.rating = rating; // Set rating
    }

    public String getComment() {
        return comment; // Return comment
    }

    public void setComment(String comment) {
        this.comment = comment; // Set comment
    }
}
