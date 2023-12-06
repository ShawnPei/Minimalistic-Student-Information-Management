package com.shawnpei.fullstackmanagement.service;

import com.shawnpei.fullstackmanagement.dao.StudentRepository;
import com.shawnpei.fullstackmanagement.exception.BadRequestException;
import com.shawnpei.fullstackmanagement.exception.StudentNotFoundException;
import com.shawnpei.fullstackmanagement.pojo.Student;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {

        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        //check if email is taken
        Boolean existsEmail = studentRepository
                .selectExistsEmail(student.getEmail());

        if (existsEmail) {

            throw new BadRequestException(
                    "Email "+student.getEmail()+" is taken");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        //check if student exists
        if (!studentRepository.existsById(id)) {
            throw new StudentNotFoundException(
                    "Student with id " + id + " does not exist");
        }
        studentRepository.deleteById(id);
    }
}
