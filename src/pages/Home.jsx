import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import authService from '../appwrite/auth'
import { Container, PostCard } from '../components'


function Home() {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    useEffect(() => {
        appwriteService.getPosts()
        .then((posts)=>{
            if (posts && posts.documents){
                setPosts(posts.documents)
            } else{
                setPosts([])
            }   
        })
        .catch(()=> setPosts([]))

        authService.getCurrentUser()
        .then(user=>{
            setUser(user)
        })
        .catch(()=>setUser(null))
    }, [])


  if ((posts.length) === 0){
    return (
        <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <div className='flex flex-wrap'>
                    <div className="p-2 w-full">
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  }

  return (
    <div className="w-full py-8">
        <Container>
            <div className='text-left mb-4'>Hello, {user?.name || "User"}</div>
            <div className="flex flex-wrap">
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Home
