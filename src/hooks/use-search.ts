"use client"

import { useState, useCallback } from 'react'
import { fetchBusinesses } from '@/services/spaceSerp'

interface SearchResults {
  businesses: any[]
}

export function useSearch() {
  const [searchResults, setSearchResults] = useState<SearchResults>({ businesses: [] })
  const [isLoading, setIsLoading] = useState(false)

  const performSearch = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults({ businesses: [] })
      return
    }

    setIsLoading(true)
    try {
      const results = await fetchBusinesses(query, 'Xabia')
      setSearchResults({
        businesses: results?.root?.places_results || [],
      })
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults({ businesses: [] })
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    searchResults,
    isLoading,
    performSearch,
  }
}
