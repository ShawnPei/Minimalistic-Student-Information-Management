package com.shawnpei.fullstackmanagement.controller;

import com.shawnpei.fullstackmanagement.pojo.Student;
import com.shawnpei.fullstackmanagement.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.shawnpei.fullstackmanagement.pojo.Gender.FEMALE;
import static com.shawnpei.fullstackmanagement.pojo.Gender.MALE;

@RestController
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }
}
