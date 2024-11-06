import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardStats } from "@/components/dashboard/stats"
import { RecentReviews } from "@/components/dashboard/recent-reviews"
import { BusinessAnalytics } from "@/components/dashboard/business-analytics"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Business Dashboard</h1>
      <DashboardStats />
      <div className="grid md:grid-cols-2 gap-8">
        <RecentReviews />
        <BusinessAnalytics />
      </div>
    </div>
  )
}
