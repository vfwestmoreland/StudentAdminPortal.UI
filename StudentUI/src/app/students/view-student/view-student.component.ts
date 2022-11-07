import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/models/api-models/ui-models/gender.model';
import { Student } from 'src/app/models/api-models/ui-models/student.model';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      Id: '',
      GenderType: ''
    },
    address: {
      id: '',
      PhysicalAddress: '',
      PostalAddress: ''
    }
  };


  @ViewChild('studentDetailsForm') studentDetailsForm?: NgForm;

  constructor(private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    ) { }



  ngOnInit(): void { 
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');

        if(this.studentId) {
          this.studentService.getStudent(this.studentId).subscribe({
            next: (res) => {
              this.student = (res)
            },
            error: (err) => console.log(err),
            complete: () => console.log(),
          });
        }
      }    
    );
  }
}


