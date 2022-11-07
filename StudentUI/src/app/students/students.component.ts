import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from '../models/api-models/ui-models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'phoneNumber','gender', 'edit'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString='';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    //Fetch Students
    this.studentService.getAllStudents().subscribe({
      next: (res) => {this.dataSource = new MatTableDataSource<Student>(res),
                      this.dataSource.paginator = this.matPaginator
                      this.dataSource.sort = this.matSort},
      error: (err) => console.log(err),
      complete: () => console.log(),
    });
  }
  
  filterStudents() {
    this.dataSource.filter = this.filterString.trim().toLowerCase()
  }
}
