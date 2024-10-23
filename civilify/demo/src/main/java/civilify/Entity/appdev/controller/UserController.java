package civilify.Entity.appdev.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import civilify.Entity.appdev.UserEntity;
import civilify.Entity.appdev.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/postUserRecord")
    public UserEntity postUserRecord(@RequestBody UserEntity user) {
        return userService.postUserRecord(user);
    }

    @GetMapping("/getAllUsers")
    public List<UserEntity> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/findByUsername")
    public List<UserEntity> getUsersByUsername(@RequestParam String username) {
        return userService.getUsersByUsername(username);
    }
    
    @PutMapping("/putUserDetails")
    public UserEntity putUserDetails(@RequestParam int userId, @RequestBody UserEntity newUserDetails) {
        return userService.putUserDetails(userId, newUserDetails);
    }

    @DeleteMapping("/deleteUser/{userId}")
    public String deleteUser(@PathVariable("userId") int userId) {
        userService.deleteUser(userId);
        return "User with ID " + userId + " has been deleted.";
    }
}
