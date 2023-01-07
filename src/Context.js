/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react'
const Context = React.createContext()

function ContextProvider({children}) {
    const [allProducts, setAllProducts] = useState([])
    const [cartItems, setCartItems] = useState([])
    let shoppingCart = JSON.parse(localStorage.getItem("cart")) || []
    let total = 0
       shoppingCart.forEach(item => {
      total += item.Qty * item.price
    })
    const [cart_Total, setCart_Total] = useState(total)
    console.log(total)
    const url = "https://picsum.photos/v2/list/?page=7&limit=8"
    useEffect(() => {
       fetch(url)
       .then(response => response.json())
       .then(data => {
        const modifiedData = data.map(photo => {
           return {
               ...photo ,
               isFavorite: false, 
               price: Math.ceil(Math.random() * 25),
               
           }
        })
        setAllProducts(modifiedData)
       

       })
       .catch(err => console.log(err.message))
        
    }, [])


    const toggleFavorite = (id) => {
              const upDatedProducts = allProducts.map(product => {
              return product.id === id ? {...product, isFavorite: !product.isFavorite} : product
    })
           setAllProducts(upDatedProducts)
    }

    const checkDuplicate = (newItem) => {
      return shoppingCart.find(item => item.id === newItem.id)
  }

    const addToCart = (newItem) => {
      let item = checkDuplicate(newItem)
      if(item) {
        const updatedCart = shoppingCart.map(i => {
          return i.id === item.id ? {...i, Qty: i.Qty + 1} : i
        })
        setCart_Total(prev => prev + newItem.price)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        }
        else {
          /*
       setCartItems(prevCart => {
        return [...prevCart, {...newItem, Qty: 1}]

       })

       */
      shoppingCart.push({...newItem, Qty: 1})
      setCart_Total(prev => prev + newItem.price)
      localStorage.setItem("cart", JSON.stringify(shoppingCart))
      }
      // eslint-disable-next-line no-undef
      M.toast({html: 'Item added to cart!'})
   }

     const updateQty = (product) => {
       setCart_Total(prev => prev + product.price)
      const updatedCart = shoppingCart.map(item => {
            return item.id === product.id ? {...item, Qty: item.Qty + 1} : item
            
         })
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

   const deleteQty = (product) => {
          setCart_Total(prev => prev - product.price)
          const updatedCart = shoppingCart.map(item => { 
            return item.id === product.id ? {...item, Qty: item.Qty - 1} : item
          })
        setCartItems(updatedCart)
        localStorage.setItem("cart", JSON.stringify(updatedCart))

   }

    const calculateTotal = (item) => {
        
         setCart_Total( prev => prev - (item.Qty * item.price))
    }

    const removeFromCart = (item, id) => {
      calculateTotal(item)
      const updatedCart =  shoppingCart.filter(product => product.id !== id )
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      M.toast({html: 'Item removed from cart!', classes: 'rounded'})

    }

  return (
    <Context.Provider value={{allProducts, toggleFavorite, addToCart, cartItems, shoppingCart, removeFromCart, cart_Total,  updateQty, deleteQty}}>
    
      {children}
    
    </Context.Provider>
  )
}

export {ContextProvider, Context}