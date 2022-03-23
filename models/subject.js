export class Subject {
  constructor(name, examDate, maxMarks, passMarks, publish) {
    this.name = name
    this.examDate = examDate
    this.maxMarks = maxMarks
    this.passMarks = passMarks
    this.publish = publish
  }
}

export class SubjectStudent {
  constructor(student, subject, marks, graceMarks, attended) {
    this.student = student
    this.subject = subject
    this.marks = marks
    this.graceMarks = graceMarks
    this.attended = attended
  }
}

export class Attendance {
  constructor(student, subject, attendance) {
    this.student = student
    this.subject = subject
    this.attendance = attendance
  }
}
