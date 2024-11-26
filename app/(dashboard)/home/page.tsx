import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, BookOpen, GraduationCap, Users } from "lucide-react";

// Placeholder data
const stats = [
  { title: "Total Students", value: 1234, icon: Users },
  { title: "Courses", value: 56, icon: BookOpen },
  { title: "Graduates", value: 789, icon: GraduationCap },
  { title: "Certifications", value: 321, icon: BadgeCheck },
];

const recentActivities = [
  {
    id: 1,
    user: "Alice Johnson",
    action: "Submitted assignment",
    course: "Mathematics 101",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Bob Smith",
    action: "Completed quiz",
    course: "History 202",
    time: "3 hours ago",
  },
  {
    id: 3,
    user: "Charlie Brown",
    action: "Enrolled in course",
    course: "Physics 301",
    time: "5 hours ago",
  },
  {
    id: 4,
    user: "Diana Prince",
    action: "Posted in forum",
    course: "Literature 404",
    time: "1 day ago",
  },
];

const upcomingDeadlines = [
  {
    id: 1,
    title: "Math Assignment",
    course: "Mathematics 101",
    dueDate: "2023-06-15",
  },
  {
    id: 2,
    title: "History Essay",
    course: "History 202",
    dueDate: "2023-06-18",
  },
  {
    id: 3,
    title: "Physics Lab Report",
    course: "Physics 301",
    dueDate: "2023-06-20",
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Student Management Dashboard</h1>
      <ModeToggle />
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities and Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions from students</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action} in {activity.course}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Assignments and tasks due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <li
                  key={deadline.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{deadline.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {deadline.course}
                    </p>
                  </div>
                  <p className="text-sm">{deadline.dueDate}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/students">Manage Students</Link>
          </Button>
          <Button asChild>
            <Link href="/courses">View Courses</Link>
          </Button>
          <Button asChild>
            <Link href="/grades">Enter Grades</Link>
          </Button>
          <Button asChild>
            <Link href="/reports">Generate Reports</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Overall Progress */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Overall Student Progress</CardTitle>
          <CardDescription>
            Average completion rate across all courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={68} className="w-full" />
          <p className="text-center mt-2 text-sm text-muted-foreground">
            68% Complete
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
