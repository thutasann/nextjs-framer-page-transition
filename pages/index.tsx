import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { motion } from 'framer-motion'
import Head from 'next/head'

function Home({ products }) {
        
    return (
        <div>
          <Head>
            <title>NEXT JS Page Transition</title>
          </Head>
          <motion.div exit={{ opacity: 0 }}>
              <div className="container">
                  <div className="info">
                      <h2>Select a product: </h2>
                  </div>
                  <div className="products">
                      { products.map((product) => (
                          <Link  
                              key={product.id} 
                              href="/products/[id]"
                              as={`/products/${product.id}`}>
                              <motion.div 
                                  initial="hidden"
                                  animate="visible"
                                  variants={{
                                      hidden: {
                                          y: 60,
                                          scale: .8,
                                          opacity: 0
                                      },
                                      visible: {
                                          y: 0,
                                          scale: 1,
                                          opacity: 1
                                      }
                                  }}
                                  className="card">
                                  <img src={product.image} />
                                  <div className="info">
                                      <h3 className="category">{product.category}</h3>
                                      <h1 className="title">{product.title}</h1>
                                  </div>
                              </motion.div>
                          </Link>
                      ))}
                  </div>
              </div>
          </motion.div>
        </div>
    )
}

Home.getInitialProps = async() => {
  const res = await fetch('https://fakestoreapi.com/products?limit=4');
  const products = await res.json();
  return {
    products
  }
}

export default Home