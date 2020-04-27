import React from 'react'
import { SearchBar } from './SearchBar'
import styled from 'styled-components'
import MediaCard from './MediaCard'
import ReactPaginate from 'react-paginate'

export const Home = ({
  setBusinesses,
  businesses,
  handlePagination,
  total,
  restartPaginate,
  category
}) => {
  const totalNumOfPages = total >= 1000 ? 1000 / 5 : total / 5
  const handlePageChange = (data) => {
    let selected = data.selected
    let offset = Math.ceil(selected * 5)
    console.log(data, offset)

    handlePagination(offset, category)
  }

  return (
    <Container>
      <SearchBar setBusinesses={setBusinesses} />
      <div className='businessWrapper'>
        <div className='businesses'>
          {businesses.map((business, i) => (
            <MediaCard
              key={i}
              business={business}
              handlePagination={handlePagination}
            />
          ))}
        </div>
      </div>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={totalNumOfPages}
        forcePage={restartPaginate ? 0 : false}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .businessWrapper {
    display: flex;
    justify-content: center;
  }
  .businesses {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    max-width: 60em;
    margin-top: 5px;
    .category {
      &:hover {
        color: orangered;
        cursor: pointer;
      }
    }
  }
  .active {
    border: 2px solid pink;
    border-radius: 30rem;
    width: 40px;
    background-color: pink;
    text-align: center;
  }
  .pagination {
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;
    border: 2px solid gray;
    font-size: 2rem;
    width: 17em;
    display: flex;
    justify-content: space-between;
  }

  .pagination li {
    display: inline-block;
    &:hover {
      color: #bb24f4;
      cursor: pointer;
    }
  }
`
