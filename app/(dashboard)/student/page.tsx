"use client";

import { useState } from "react";



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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  BookOpen,
  CalendarIcon,
  Clock,
  FileText,
  GraduationCap,
} from "lucide-react";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
// Placeholder data
const studentInfo = {
  name: "John Doe",
  id: "CS2023001",
  branch: "Computer Science",
  year: "3rd Year",
  semester: "6th Semester",
};

const timetable = [
  {
    day: "Monday",
    classes: ["Data Structures (10:00 AM)", "Machine Learning (2:00 PM)"],
  },
  {
    day: "Tuesday",
    classes: ["Database Systems (11:00 AM)", "Web Development (3:00 PM)"],
  },
  {
    day: "Wednesday",
    classes: ["Computer Networks (9:00 AM)", "Operating Systems (1:00 PM)"],
  },
  {
    day: "Thursday",
    classes: [
      "Artificial Intelligence (10:00 AM)",
      "Software Engineering (2:00 PM)",
    ],
  },
  {
    day: "Friday",
    classes: ["Cloud Computing (11:00 AM)", "Mobile App Development (3:00 PM)"],
  },
];

const assignments = [
  {
    id: 1,
    subject: "Data Structures",
    title: "Implement Red-Black Tree",
    dueDate: "2023-06-20",
    status: "Pending",
  },
  {
    id: 2,
    subject: "Machine Learning",
    title: "Neural Network Project",
    dueDate: "2023-06-25",
    status: "Submitted",
  },
  {
    id: 3,
    subject: "Database Systems",
    title: "Design E-commerce Database",
    dueDate: "2023-06-22",
    status: "Pending",
  },
  {
    id: 4,
    subject: "Web Development",
    title: "Create a React App",
    dueDate: "2023-06-28",
    status: "Not Started",
  },
];

const attendanceData = [
  { subject: "Data Structures", attended: 18, total: 20 },
  { subject: "Machine Learning", attended: 16, total: 20 },
  { subject: "Database Systems", attended: 19, total: 20 },
  { subject: "Web Development", attended: 17, total: 20 },
];

const results = [
  { subject: "Data Structures", grade: "A", score: 92 },
  { subject: "Machine Learning", grade: "B+", score: 87 },
  { subject: "Database Systems", grade: "A-", score: 89 },
  { subject: "Web Development", grade: "A", score: 95 },
];

const notifications = [
  {
    id: 1,
    type: "assignment",
    message: "New assignment posted in Data Structures",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "grade",
    message: "Your Machine Learning project has been graded",
    time: "1 day ago",
  },
  {
    id: 3,
    type: "event",
    message: "Upcoming workshop on Cloud Computing",
    time: "3 days ago",
  },
  {
    id: 4,
    type: "deadline",
    message: "Reminder: Database Systems assignment due tomorrow",
    time: "Just now",
  },
];

export default function StudentDashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
 

  return (
    <div className="container mx-auto p-4">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <div className="flex items-center space-x-4">
         
          
            <UserButton />
        
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Branch</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentInfo.branch}</div>
            <p className="text-xs text-muted-foreground">
              {studentInfo.year}, {studentInfo.semester}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Courses Enrolled
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
            <p className="text-xs text-muted-foreground">
              {assignments.filter((a) => a.status === "Pending").length} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Attendance
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (attendanceData.reduce(
                  (sum, subject) => sum + subject.attended,
                  0
                ) /
                  attendanceData.reduce(
                    (sum, subject) => sum + subject.total,
                    0
                  )) *
                  100
              )}
              %
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="timetable" className="space-y-4">
        <div className="overflow-auto">
          <TabsList className="inline-flex min-w-full sm:min-w-[0]">
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="timetable" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Timetable</CardTitle>
              <CardDescription>
                Your class schedule for the week
              </CardDescription>
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
                      <TableCell>
                        <ul>
                          {day.classes.map((class_, index) => (
                            <li key={index}>{class_}</li>
                          ))}
                        </ul>
                      </TableCell>
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
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>
                Your current and upcoming assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">
                        {assignment.subject}
                      </TableCell>
                      <TableCell>{assignment.title}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            assignment.status === "Submitted"
                              ? "default"
                              : assignment.status === "Pending"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          {assignment.status === "Submitted"
                            ? "View"
                            : "Submit"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>
                Your attendance record for each subject
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Attended</TableHead>
                    <TableHead>Total Classes</TableHead>
                    <TableHead>Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((subject) => (
                    <TableRow key={subject.subject}>
                      <TableCell className="font-medium">
                        {subject.subject}
                      </TableCell>
                      <TableCell>{subject.attended}</TableCell>
                      <TableCell>{subject.total}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={(subject.attended / subject.total) * 100}
                            className="w-[60%]"
                          />
                          <span className="text-sm font-medium">
                            {Math.round(
                              (subject.attended / subject.total) * 100
                            )}
                            %
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Academic Results</CardTitle>
              <CardDescription>
                Your grades and scores for each subject
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.subject}>
                      <TableCell className="font-medium">
                        {result.subject}
                      </TableCell>
                      <TableCell>{result.grade}</TableCell>
                      <TableCell>{result.score}</TableCell>
                      <TableCell>
                        <Progress value={result.score} className="w-[60%]" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Recent updates and announcements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="flex items-start space-x-4 p-4 bg-muted rounded-lg"
                  >
                    <div className="bg-primary rounded-full p-2">
                      <Bell className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{notification.message}</p>
                      <p className="text-sm text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                    <Badge
                      variant={
                        notification.type === "assignment"
                          ? "default"
                          : notification.type === "grade"
                          ? "secondary"
                          : notification.type === "event"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {notification.type}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
