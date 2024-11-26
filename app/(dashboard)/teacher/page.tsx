"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen, Clock, Users } from "lucide-react";
import { ModeToggle } from "@/components/theme/ModeToggle";

// Placeholder data
const teacherClasses = [
  {
    id: 1,
    name: "Data Structures",
    branch: "Computer Science",
    year: "2nd Year",
    time: "10:00 AM - 11:00 AM",
  },
  {
    id: 2,
    name: "Digital Electronics",
    branch: "Electronics",
    year: "1st Year",
    time: "11:00 AM - 12:00 PM",
  },
  {
    id: 3,
    name: "Machine Learning",
    branch: "Computer Science",
    year: "3rd Year",
    time: "2:00 PM - 3:00 PM",
  },
  {
    id: 4,
    name: "Control Systems",
    branch: "Electrical",
    year: "2nd Year",
    time: "3:00 PM - 4:00 PM",
  },
];

const timetable = [
  { day: "Monday", classes: ["Data Structures", "Machine Learning"] },
  { day: "Tuesday", classes: ["Digital Electronics", "Control Systems"] },
  { day: "Wednesday", classes: ["Data Structures", "Machine Learning"] },
  { day: "Thursday", classes: ["Digital Electronics", "Control Systems"] },
  { day: "Friday", classes: ["Data Structures", "Machine Learning"] },
];

const students = [
  { id: 1, name: "Alice Johnson", present: false },
  { id: 2, name: "Bob Smith", present: false },
  { id: 3, name: "Charlie Brown", present: false },
  { id: 4, name: "Diana Prince", present: false },
];

export default function TeacherDashboardPage() {
  const [selectedClass, setSelectedClass] = useState("");
  const [attendanceList, setAttendanceList] = useState(students);

  const handleAttendanceChange = (studentId: number) => {
    setAttendanceList(
      attendanceList.map((student) =>
        student.id === studentId
          ? { ...student, present: !student.present }
          : student
      )
    );
  };

  const submitAttendance = () => {
    console.log("Submitting attendance for", selectedClass, attendanceList);
    // Here you would typically send this data to your backend
  };

  return (
      <div className="container mx-auto p-4">
          
          <h1 className="text-2xl md:text-3xl font-bold mb-6">User Dashboard</h1>
          <ModeToggle></ModeToggle>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherClasses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Taught</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
      </div>

      {/* Timetable and Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Timetable</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Classes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timetable.map((day) => (
                  <TableRow key={day.day}>
                    <TableCell className="font-medium">{day.day}</TableCell>
                    <TableCell>{day.classes.join(", ")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>
      </div>

      {/* Teacher's Classes */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>My Classes</CardTitle>
          <CardDescription>Overview of your assigned classes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teacherClasses.map((class_) => (
                <TableRow key={class_.id}>
                  <TableCell className="font-medium">{class_.name}</TableCell>
                  <TableCell>{class_.branch}</TableCell>
                  <TableCell>{class_.year}</TableCell>
                  <TableCell>{class_.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Attendance Marking */}
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>
            Select a class and mark attendance for today's lecture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {teacherClasses.map((class_) => (
                  <SelectItem key={class_.id} value={class_.name}>
                    {class_.name} - {class_.branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedClass && (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceList.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={student.present}
                            onCheckedChange={() =>
                              handleAttendanceChange(student.id)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button onClick={submitAttendance}>Submit Attendance</Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
