import React, { useRef } from 'react'
import styled from 'styled-components'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'
import { withFormik } from 'formik'

const formikEnhancer = withFormik({
  mapPropsToValues: (props) => ({
    location: '',
    categories: [],
    term: ''
  })
})

const PreRouterSearchBar = (props) => {
  console.log(props.values)
  const selectIn = useRef(null)
  const handleSubmit = (values) => {
    console.log('what are the values', values, selectIn.current)
    if (values.location) {
      const filter =
        selectIn.current.state.value === null
          ? ''
          : selectIn.current.state.value.value
      
      window.localStorage.setItem('location', JSON.stringify(values.location))
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/yelp/search`, {
          params: {
            location: values.location,
            categories: filter
          }
        })
        .then(({ data }) => props.setBusinesses(data.businesses, data.total,filter, true))
    }
  }
  const localLocation = window.localStorage.getItem('location')

  return (
    <StyledHero>
      <p>Jelpson</p>

      <Formik
        initialValues={{ location: JSON.parse(localLocation), term: [] }}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {() => (
          <Form className='inputs-container'>
            <div className='search-container type'>
              <label htmlFor='term'>category?</label>

              <Select
                id='term'
                ref={selectIn}
                isClearable={true}
                options={[
                  { value: 'parks', label: 'Parks' },
                  { value: 'sandwiches', label: 'Sandwiches' },
                  { value: 'museums', label: 'Museums' }
                ]}
                multi={true}
                // onChange={this.handleChange}
                // onBlur={this.handleBlur}
                name='term'
              />
            </div>
            <div className='search-container locale'>
              <label htmlFor='location'>Where?</label>
              <Field
                id='location'
                type='text'
                placeholder='Los Angeles'
                name='location'
              />
            </div>
            <button type='submit' className='search-button'>
              go
            </button>
          </Form>
        )}
      </Formik>
    </StyledHero>
  )
}

const StyledHero = styled.div`
  position: relative;
  background-image: url('https://images.squarespace-cdn.com/content/v1/5c15ec1ce74940545d798ed2/1578436564506-TDJ20B164PD29I3MVBEX/ke17ZwdGBToddI8pDm48kMODvtMXx2HcJWIP_usaibsUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcePFY_vJjrcB0eHdyVLmKKl3RbNnNgnVSmG3oHNOOIKpDmBPzNKSNAitbcxFqxEg1/all-businesses.png?format=2500w');
  background-color: black;
  background-size: cover;
  background-position: center;
  height: 650px;
  display: flex;
  align-items: center;
  flex-flow: column;
  #term {
    width: 75%;
  }
  p {
    font-size: 14rem;
    color: white;
    font-family: 'Londrina Outline', cursive;
    margin-bottom: 20px;
  }
  .inputs-container {
    width: 900px;
    height: 50px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-flow: row;
    justify-content: center;
    .search-container {
      width: 47%;
      display: flex;
      flex-flow: row;
      align-items: center;
      label {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80%;
        width: 18%;
        font-weight: bold;
        letter-spacing: 0.8px;
      }
      input {
        letter-spacing: 0.6px;
        height: 80%;
        width: 82%;
        border: none;
        font-size: 1em;
        display: flex;
        align-items: center;
        outline: none;
      }
    }
    .locale {
      label {
        border-left: 1px solid lightslategrey;
        letter-spacing: 0.8px;
      }
    }
    .type {
      label {
        margin-left: 1em;
        margin-right: 0.5em;
      }
    }
    .search-button {
      position: relative;
      width: 6%;
      font-size: 1em;
      font-weight: bold;
      letter-spacing: 0.5px;
      background-color: #558c8c;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0px 5px 5px 0px;
      border: 1px solid #558c8c;
      right: -1px;
      letter-spacing: 0.8px;
    }
  }
`
const SearchBar = formikEnhancer(PreRouterSearchBar)

export { SearchBar }
