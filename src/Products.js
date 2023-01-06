import React, {useContext} from 'react'
import { Context } from './Context'
import Product from "./components/Product" 

function Products() {
    const {allProducts} = useContext(Context)
    const productsArray = allProducts.map((product) => {
         return <Product key={product.id} product={product} />
    })
    return (
          <main className="products">
              {productsArray}
          </main>
    )
}
export default  Products