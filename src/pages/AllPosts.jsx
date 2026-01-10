import React from 'react'
import appwriteService from '../appwrite/posts_config.js'
import {PostCard, Container} from '../components'
import { useState, useEffect } from 'react'

function AllPosts() {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([])
        .then((posts) =>{
          if (posts && posts.documents) setPosts(posts.documents)
        })
        
    }, [])

  return (posts.length !== 0) ? (
    <div className='w-full py-8'>
      <Container>
      <div className='flex flex-wrap'>
        {posts.map( (post) => (
            <div key={post.$id} className='p-2 w-1/4'>
                <PostCard {...post} />
            </div>
        ))}
      </div>
      </Container>
    </div>
  ) : <h2>No posts to show</h2>
}

export default AllPosts
