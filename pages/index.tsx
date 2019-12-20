import React, { useState } from 'react'

import Header from '#components/Header/Header'
import Search from '#components/Search/Search'
import Results from '#components/Results/Results'

const Home = () => {
  const [results, setResults] = useState<SearchResults | null>(null)

  const onSearch = async (params: SearchParams) => {
    const search: SearchResults = await fetch('/api/search', {
      method: 'post',
      body: JSON.stringify(params),
    }).then((r) => r.json())

    setResults(search)
  }

  return (
    <>
      <Header />
      <Search onSearch={onSearch} />
      <Results results={results} />
    </>
  )
}

export default Home
