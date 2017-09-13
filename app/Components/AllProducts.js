import React from 'react'
import { NavLink } from 'react-router-dom';

const AllProducts = (props) => {
  const products = [{id: 1, name: 'chocolate ice cream', desc:'chocolate!', image:'https://placekitten.com/200/200'},
                    {id: 2, name: 'vanilla ice cream', desc:'vanilla!', image:'https://placekitten.com/200/200' } ,
                    {id: 3, name: 'popsicle', desc:'popsicle!', image:'https://placekitten.com/200/200'},
                    {id: 4, name: 'sundae', desc:'sundae!', image:'https://placekitten.com/200/200'}];

  return (
    <ul>
      {products && products.map( product => (
        <li key={product.name}>
          <NavLink to='#'>
            <h2> { product.name } </h2>
            <img src={product.image} />
            <p>  { product.desc } </p>
          </NavLink>
        </li>
      ) )}
    </ul>
  )
}

export default AllProducts;
