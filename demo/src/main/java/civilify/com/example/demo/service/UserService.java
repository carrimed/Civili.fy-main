package civilify.com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import civilify.com.example.demo.entity.UserEntity;
import civilify.com.example.demo.repository.UserRepository;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;



@Service
public class UserService {

    @Autowired
    private UserRepository urepo;

    public UserEntity postUserRecord(UserEntity user) {
        return urepo.save(user);
    }

    public List<UserEntity> getAllUsers() {
        return urepo.findAll();
    }

    public List<UserEntity> getUsersByUsername(String username) {
        return urepo.findByUsername(username);
    }

    @SuppressWarnings("finally")
    public UserEntity putUserDetails(int user_id, UserEntity newUserDetails) {
        UserEntity user = new UserEntity();
        try {
            user = urepo.findById(user_id).orElseThrow(() -> 
                new NoSuchElementException("User with ID " + user_id + " not found."));
            
            user.setName(newUserDetails.getName());
            user.setUsername(newUserDetails.getUsername());
            user.setContactNumber(newUserDetails.getContactNumber());
            user.setPassword(newUserDetails.getPassword());
        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("User with ID " + user_id + " not found.");
        } finally {
            return urepo.save(user);
        }
    }

    public String deleteUser(int userId) {
        String msg;
        if (urepo.existsById(userId)) {  // Check if the user exists
            urepo.deleteById(userId);    // Pass the correct userId
            msg = "User with ID " + userId + " successfully deleted!";
        } else {
            msg = "User with ID " + userId + " NOT found!";
        }
        return msg;
    }

}
