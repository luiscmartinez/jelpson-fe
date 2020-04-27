import React, { Suspense, useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import { Home } from './components'

function App() {
  const [state, setState] = useState({
    businesses: [],
    category: '',
    restartPaginate: false
  })
  const setBusinesses = (businesses, total, category) => {
    window.localStorage.setItem('businesses', JSON.stringify(businesses))
    window.localStorage.setItem('total', JSON.stringify(total))
    setState({ businesses, total, category })
  }
  const handlePagination = (offset, category = '', resetTotal = false) => {
    if (category) {
      window.localStorage.setItem('category', JSON.stringify(category))
    }

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/yelp/search`, {
        params: {
          location: window.localStorage.getItem('location'),
          categories: category || state.category,
          offset: offset
        }
      })
      .then(({ data }) => {
        if (resetTotal) {
          return setState({
            ...state,
            businesses: data.businesses,
            total: data.total,
            category,
            restartPaginate: true
          })
        }
        setState({
          ...state,
          businesses: data.businesses,
          restartPaginate: false
        })
      })
  }

  useEffect(() => {
    const localBusinesses = localStorage.getItem('businesses')
    const localTotal = localStorage.getItem('total')
    if (state.businesses.length === 0 && localBusinesses) {
      setState({
        businesses: JSON.parse(localBusinesses),
        total: Number(JSON.parse(localTotal))
      })
    }
  }, [state.businesses])
  const { businesses, total, restartPaginate } = state
  return (
    <Container>
      <Suspense fallback={null}>
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => (
              <Home
                {...props}
                setBusinesses={setBusinesses}
                businesses={businesses}
                total={total}
                handlePagination={handlePagination}
                restartPaginate={restartPaginate}
                category={state.category}
              />
            )}
          />
        </Switch>
      </Suspense>
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: blueviolet;
`
