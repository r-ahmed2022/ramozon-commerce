import React, {useState, useEffect, useRef} from 'react'
const Context = React.createContext()

function ContextProvider({children}) {
    const [allProducts, setAllProducts] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [cart_Total, setCart_Total] = useState(0)
    const ref = useRef(null)
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
      return cartItems.find(item => item.id === newItem.id)
  }

    const addToCart = (newItem) => {
      let item = checkDuplicate(newItem)
      setCart_Total(prev => prev + newItem.price)
      if(item) {
        const updatedCart = cartItems.map(i => {
          return i.id === item.id ? {...i, Qty: i.Qty + 1} : i
        })
        setCartItems(updatedCart)
        }
        else {
       setCartItems(prevCart => {
        return [...prevCart, {...newItem, Qty: 1}]

       })
      }
      console.log(cartItems)
   }

     const updateQty = (product) => {
       setCart_Total(prev => prev + product.price)
      const updatedCart = cartItems.map(item => {
            return item.id === product.id ? {...item, Qty: item.Qty + 1} : item
            
         })
    setCartItems(updatedCart)
    console.log(cartItems)
     }

   const deleteQty = (product) => {
          setCart_Total(prev => prev - product.price)
          const updatedCart = cartItems.map(item => { 
            return item.id === product.id ? {...item, Qty: item.Qty - 1} : item
          })
        setCartItems(updatedCart)
   }

    const calculateTotal = (item) => {
        
         setCart_Total( prev => prev - (item.Qty * item.price))
    }

    const removeFromCart = (item, id) => {
      calculateTotal(item)
      setCartItems(prevstate => prevstate.filter(product => product.id !== id ))
    }

  return (
    <Context.Provider value={{allProducts, toggleFavorite, addToCart, cartItems, removeFromCart, cart_Total,  updateQty, deleteQty}}>
    
      {children}
    
    </Context.Provider>
  )
}

export {ContextProvider, Context}