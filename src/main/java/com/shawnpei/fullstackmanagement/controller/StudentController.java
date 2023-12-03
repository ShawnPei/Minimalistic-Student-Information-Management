package com.shawnpei.fullstackmanagement.controller;

import com.shawnpei.fullstackmanagement.pojo.Student;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.shawnpei.fullstackmanagement.pojo.Gender.FEMALE;
import static com.shawnpei.fullstackmanagement.pojo.Gender.MALE;

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents() {
        return List.of(
                new Student(
                        1L,
                        "Shawn",
                        "shawn@gmail.com",
                        MALE),
                new Student(
                        2L,
                        "Pei",
                        "pei@gmail.com",
                        FEMALE)
        );
    }
}
