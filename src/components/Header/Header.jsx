import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()

    const navItems = [  //this will be looped(mapped) through to get navItems in the Header
    {
      name: 'Home',
      slug: "/", //url
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-slate-700'>
        <Container>
            <nav className='flex'>
                <div className='mr-4'>
                    <Link to='/'>
                        <Logo width='70px' />
                    </Link>
                </div>

                <ul className='flex ml-auto gap-3'>
                {navItems.map((item)=> 
                    item.active ? (
                        <li key={item.name}>
                            <button
                            onClick={()=>navigate(item.slug)}
                            className='inline-block px-4 py-2 duration-200 border-2 border-white bg-white hover:border-blue-400 rounded-full'

                            >{item.name}</button>
                        </li>
                    ) : null
                )}

                {authStatus && (
                    <li>
                        <LogoutBtn />
                    </li>
                )}

                </ul>
            </nav>
        </Container>
    </header>
  )
}

export default Header
