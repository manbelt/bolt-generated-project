import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import categories from '@/data/categories.json'
import neighborhoods from '@/data/neighborhoods.json'

type Props = {
  params: { categorySlug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categories.categories.find(c => c.id === params.categorySlug)
  if (!category) return { title: 'Not Found' }

  return {
    title: `Best ${category.title} in Jávea, Spain | Jávea Directory`,
    description: `Discover top-rated ${category.title.toLowerCase()} across Jávea. Browse by neighborhood and find the perfect ${category.title.toLowerCase()} for you.`,
  }
}

export async function generateStaticParams() {
  return categories.categories.map((category) => ({
    categorySlug: category.id,
  }))
}

export default function CategoryPage({ params }: Props) {
  const category = categories.categories.find(c => c.id === params.categorySlug)
  if (!category) notFound()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Best {category.title} in Jávea</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore {category.title.toLowerCase()} across different neighborhoods in Jávea
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {neighborhoods.neighborhoods.map((neighborhood) => (
            <Link 
              key={neighborhood.id} 
              href={`/${params.categorySlug}/${neighborhood.id}`}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {category.title} in {neighborhood.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{neighborhood.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
