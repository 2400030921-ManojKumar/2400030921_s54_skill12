package com.klef.fsad.studentcrud.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.fsad.studentcrud.entity.Student;
import com.klef.fsad.studentcrud.repository.StudentRepository;
@Service
public class StudentService
{
    @Autowired
    private StudentRepository repository;
    public Student addStudent(Student student)
    {
        return repository.save(student);
    }
    public List<Student> getAllStudents()
    {
        return repository.findAll();
    }
    public Student updateStudent(Long id, Student student)
    {
        Optional<Student> existing = repository.findById(id);
        if(existing.isPresent())
        {
            Student s = existing.get();
            s.setName(student.getName());
            s.setEmail(student.getEmail());
            s.setCourse(student.getCourse());

            return repository.save(s);
        }
        return null;
    }
    public String deleteStudent(Long id)
    {
        repository.deleteById(id);
        return "Student deleted successfully";
    }
}