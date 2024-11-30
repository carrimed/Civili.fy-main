package civilify.com.example.demo; // Update this line to match your package structure


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
        
    }
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // This tells Spring Boot where to look for images
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/images/"); // Look in 'static/images' folder
    }
}
