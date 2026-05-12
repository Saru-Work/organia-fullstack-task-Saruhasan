package com.organia.backend.controllers;
import com.organia.backend.entities.Task;
import com.organia.backend.entities.User;
import com.organia.backend.repositories.UserRepository;
import com.organia.backend.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Task>> getTasks(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(taskService.getAllTasksForUser(user));
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task, Authentication authentication) {

        org.springframework.security.core.userdetails.UserDetails userDetails =
                (org.springframework.security.core.userdetails.UserDetails) authentication.getPrincipal();

        User user = userRepository.findByEmail(userDetails.getUsername());

        return ResponseEntity.ok(taskService.createTask(task, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(
            @PathVariable Long id,
            @RequestBody Task taskDetails,
            Authentication authentication) {

        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User currentUser = userRepository.findByEmail(userDetails.getUsername());
            Task updatedTask = taskService.updateTask(id, taskDetails, currentUser);
            return ResponseEntity.ok(updatedTask);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
}