package com.shawnpei.fullstackmanagement.dao;
import com.shawnpei.fullstackmanagement.pojo.Student;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN " +
            "TRUE ELSE FALSE END " +
            "FROM Student s " +
            "WHERE s.email = ?1")
    Boolean selectExistsEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Student s SET s.name = CASE WHEN :#{#student.name} IS NULL THEN s.name ELSE :#{#student.name} END, s.email = CASE WHEN :#{#student.email} IS NULL THEN s.email ELSE :#{#student.email} END, s.gender = CASE WHEN :#{#student.gender} IS NULL THEN s.gender ELSE :#{#student.gender} END WHERE s.id = :#{#student.id}")
    void update(@Param("student") Student student);
}
