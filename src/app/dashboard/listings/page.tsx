import { BusinessListings } from "@/components/dashboard/business-listings"

export default function ListingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Listings</h1>
      <BusinessListings />
    </div>
  )
}
