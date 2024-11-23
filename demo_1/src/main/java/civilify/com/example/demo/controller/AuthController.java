package civilify.com.example.demo.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import civilify.com.example.demo.model.LoginRequest;
import civilify.com.example.demo.model.LoginResponse;
import civilify.com.example.demo.service.ClientService;
import civilify.com.example.demo.service.JwtService;
import civilify.com.example.demo.util.JwtUtil;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "*"})
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtService jwtService;
    private final ClientService clientService;

    public AuthController(JwtService jwtService, ClientService clientService) {
        this.jwtService = jwtService;
        this.clientService = clientService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        boolean isValidUser = clientService.validateUser(loginRequest.getUsername(), loginRequest.getPassword());
        if (!isValidUser) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        //Generates token if credentials are valid 
        String token = jwtService.generateToken(loginRequest.getUsername());
        return ResponseEntity.ok(new LoginResponse(token));
    }
    
    // Endpoint to generate a JWT token for a given user (for testing)
    @GetMapping("/generate-token")
    public String generateToken(String username) {
        return JwtUtil.generateToken(username);
    }

    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        String jwt = token.replace("Bearer ", ""); // Remove Bearer prefix
        String username = jwtService.extractUsername(jwt);

        boolean isValid = jwtService.validateToken(jwt, username);
        return isValid ? ResponseEntity.ok("Token is valid") : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is invalid");
    }

    // A sample endpoint to show how you can use the token in an API (No security config required yet)
    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to the secure API!";
    }
}