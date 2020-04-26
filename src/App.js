import React, { Suspense, useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import { Home } from './components'

function App() {
  const [state, setState] = useState({
    businesses: [],
    catagory: '',
    restartPaginate: false
  })
  const setBusinesses = (businesses, total) => {
    window.localStorage.setItem('businesses', JSON.stringify(businesses))
    window.localStorage.setItem('total', JSON.stringify(total))
    setState({ businesses, total })
  }
  const handlePagination = (offset, catagory = '', resetTotal = false) => {
    if (catagory) {
      window.localStorage.setItem('catagory', JSON.stringify(catagory))
    }

    axios
      .get('http://localhost:8000/api/v1/yelp/search', {
        params: {
          location: window.localStorage.getItem('location'),
          categories: catagory || state.catagory,
          offset: offset
        }
      })
      .then(({ data }) => {
        if (resetTotal) {
          return setState({
            ...state,
            businesses: data.businesses,
            total: data.total,
            catagory,
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
