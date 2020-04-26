import React from 'react'
import { Category } from './Category'
import styled from 'styled-components'

export const Categories = ({ categories, handlePagination }) => {
  return (
    <StyledCategories>
      {categories.map((category, i) => {
        return (
          <Category category={category} handlePagination={handlePagination} />
        )
      })}
    </StyledCategories>
  )
}

const StyledCategories = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`
