

import { useRouter } from 'next/router'
import React from 'react'

const dashboard = ({data}) => {

  const router = useRouter() 

  // console.log(data)
  return (
    <div>
      {data.map(val => <p onClick={() => router.push(`/post/${val.id}`)}>{val.title}</p>)}
    </div>
  )
}

export default dashboard


export async function getStaticProps() {
  
  const result = await fetch("https://jsonplaceholder.typicode.com/posts")
  const data = await result.json()

  return {
    props : { data }
  }
}