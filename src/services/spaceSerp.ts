import axios from 'axios';

interface FilterOptions {
  category?: string;
  neighborhood?: string;
  rating?: string;
  price?: string;
}

export const fetchBusinesses = async (
  query: string,
  location: string,
  filters?: FilterOptions,
  sortBy: string = 'relevance'
) => {
  try {
    let searchQuery = query;

    // Apply filters to the search query
    if (filters) {
      if (filters.rating) {
        searchQuery += ` ${filters.rating}+ rating`;
      }
      if (filters.price) {
        const priceLevel = '€'.repeat(parseInt(filters.price));
        searchQuery += ` ${priceLevel}`;
      }
    }

    const response = await axios.get(process.env.API_BASE_URL!, {
      params: {
        apiKey: process.env.API_KEY,
        q: searchQuery,
        location: `Xabia,Valencian Community,Spain`,
        domain: 'google.es',
        gl: 'es',
        hl: 'en',
        pageNumber: '1',
        resultFormat: 'json',
        tbm: 'lcl',
        sort: sortBy === 'rating' ? 'rating' : 'relevance'
      }
    });

    let results = response.data?.root?.places_results || [];

    // Apply additional sorting if needed
    if (sortBy === 'reviews') {
      results = results.sort((a: any, b: any) => (b.reviews || 0) - (a.reviews || 0));
    } else if (sortBy === 'newest') {
      // This would require additional data from the API
      // For now, we'll maintain the default order
    }

    return {
      ...response.data,
      root: {
        ...response.data.root,
        places_results: results
      }
    };
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return null;
  }
};

// ... rest of the existing code ...
