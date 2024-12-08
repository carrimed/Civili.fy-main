package civilify.com.example.demo.DTO;

public class LawyerSearchCriteria {
    private String category;
    private String lawyerType;
    private Integer minRatePerHour;
    private Integer maxRatePerHour;

    // Getters & Setters
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLawyerType() {
        return lawyerType;
    }

    public void setLawyerType(String lawyerType) {
        this.lawyerType = lawyerType;
    }

    public Integer getMinRate() {
        return minRatePerHour;
    }

    public void setMinRate(Integer minRatePerHour) {
        this.minRatePerHour = minRatePerHour;
    }

    public Integer getMaxRate() {
        return maxRatePerHour;
    }

    public void setMaxRate(Integer maxRatePerHour) {
        this.maxRatePerHour = maxRatePerHour;
    }
}
