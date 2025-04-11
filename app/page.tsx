import { DashboardShell } from "@/components/dashboard-shell"

export default function Home() {
  // In a real app, check if user is authenticated
  // If not, redirect to login page
  // For demo purposes, we'll just show the dashboard
  // const isAuthenticated = false
  // if (!isAuthenticated) {
  //   redirect("/login")
  // }

  return <DashboardShell />
}

