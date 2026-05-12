package com.organia.backend.services;
import com.organia.backend.entities.Task;
import com.organia.backend.entities.User;
import com.organia.backend.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasksForUser(User user) {
        return taskRepository.findByUserId(user.getId());
    }

    public Task createTask(Task task, User user) {
        task.setUser(user);
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Task updateTask(Long id, Task taskDetails, User user) {
        // 1. Find the existing task
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        // 2. Security Check: Ensure the user owns this task
        if (!existingTask.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You do not have permission to update this task");
        }

        // 3. Apply updates
        existingTask.setTitle(taskDetails.getTitle());
        existingTask.setDescription(taskDetails.getDescription());
        existingTask.setStatus(taskDetails.getStatus());
        existingTask.setDueDate(taskDetails.getDueDate());

        // 4. Save and return
        return taskRepository.save(existingTask);
    }
}