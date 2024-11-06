// Update the imports section
import { ReviewsSection } from "@/components/reviews/reviews-section"

// Add to the existing business page component
export default async function BusinessPage({ params }: Props) {
  // ... existing code ...

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* ... existing content ... */}

        <div className="mt-8">
          <ReviewsSection
            businessId={params.businessId}
            reviews={business.reviews_data || []}
            averageRating={business.rating || 0}
            totalReviews={business.reviews || 0}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
