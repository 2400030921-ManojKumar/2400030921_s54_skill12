package com.klef.fsad.studentcrud.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.fsad.studentcrud.entity.Student;
public interface StudentRepository extends JpaRepository<Student, Long>
{
}