package civilify.com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.CascadeType;

@Entity
@Table(name = "REVIEW")
public class ReviewEntity {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int review_id;
	
	    @ManyToOne
	    @JoinColumn(name = "clientId")
	    private ClientEntity client;
	
	    @ManyToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "lawyerId", nullable = false)
	    private LawyerEntity lawyer;
	
	    private int rating;
	    private String comment;
	
	    private boolean would_recommend;  // Added boolean attribute
	
	    // Getters and Setters
	    public int getReviewId() {
	        return review_id;
	    }
	
	    public void setReviewId(int review_id) {
	        this.review_id = review_id;
	    }
	
	    public ClientEntity getClient() {
	        return client;
	    }
	
	    public void setClient(ClientEntity client) {
	        this.client = client;
	    }
	
	    public LawyerEntity getLawyer() {
	        return lawyer;
	    }
	
	    public void setLawyer(LawyerEntity lawyer) {
	        this.lawyer = lawyer;
	    }
	
	    public int getRating() {
	        return rating;
	    }
	
	    public void setRating(int rating) {
	        this.rating = rating;
	    }
	
	    public String getComment() {
	        return comment;
	    }
	
	    public void setComment(String comment) {
	        this.comment = comment;
	    }
	
	    public boolean isWouldRecommend() {  // Getter for would_recommend
	        return would_recommend;
	    }
	
	    public void setWouldRecommend(boolean would_recommend) {  // Setter for would_recommend
	        this.would_recommend = would_recommend;
	    }
}
