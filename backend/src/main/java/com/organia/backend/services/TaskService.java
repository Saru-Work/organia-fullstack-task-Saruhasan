package com.organia.backend.services;
import com.organia.backend.entities.Task;
import com.organia.backend.entities.User;
import com.organia.backend.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasksForUser(User user) {
        return taskRepository.findByUserId(user.getId());
    }
    public Optional<Task> getTask(Long id){
        return taskRepository.findById(id);
    }
    public Task createTask(Task task, User user) {
        task.setUser(user);
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

//    public Task completeTask(Long id, Task taskDetails, User user){
//        Task existingTask = taskRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
//
//        if (!existingTask.getUser().getId().equals(user.getId())) {
//            throw new RuntimeException("You do not have permission to update this task");
//        }
//        existingTask.setStatus(Task.Status.COMPLETED);
//
//        return taskRepository.save(existingTask);
//
//    }
//
//    public Task incompleteTask(Long id, Task taskDetails, User user){
//        Task existingTask = taskRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
//
//        if (!existingTask.getUser().getId().equals(user.getId())) {
//            throw new RuntimeException("You do not have permission to update this task");
//        }
//        existingTask.setStatus(Task.Status.COMPLETED);
//
//        return taskRepository.save(existingTask);
//
//    }

    public Task updateTask(Long id, Task taskDetails, User user) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        if (!existingTask.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You do not have permission to update this task");
        }

        existingTask.setTitle(taskDetails.getTitle());
        existingTask.setDescription(taskDetails.getDescription());
        existingTask.setStatus(taskDetails.getStatus());
        existingTask.setDueDate(taskDetails.getDueDate());
        existingTask.setCategory(taskDetails.getCategory());
        existingTask.setTime(taskDetails.getTime());

        return taskRepository.save(existingTask);
    }
}