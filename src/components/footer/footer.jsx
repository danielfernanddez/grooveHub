import { NavLink } from 'react-router-dom'
import './footer.css'

export const Footer = () => {
    return(
        <>
            <div className='Footer'>
                <div className='Footer-izqda'>
                    <NavLink to ={'inicio'}><span className='Footer-logo'>grooveHub</span></NavLink>
                    <a className='Footer-contact' href="mailto:groovehub@mail.com" title='Mail'>groovehub@mail.com</a>
                    <a className='Footer-contact' href="tel:+34666666666" title='Phone'>+34 666 66 66 66</a>
                </div>
                <div className='Footer-dcha'>
                    <div className='Footer-nav'>
                        <NavLink to ={'inicio'}><span>Home</span></NavLink>
                        <NavLink to ={'collection'}><span>Collection</span></NavLink>
                        <NavLink to ={'users'}><span>Users</span></NavLink>
                        <NavLink to ={'inicio'}><span className='Footer-nav-span'>Let's Dance</span></NavLink>
                    </div>
                    <div className='Footer-rrss'>
                        <p className='Footer-p'>Follow us in Social Media!</p>
                        <div className='Footer-icons'>
                            <a className='Footer-icon' href="www.instagram.com"><img src="/assets/instagram.svg" alt="instagram-svg" title='Instagram' /></a>
                            <a className='Footer-icon' href="twitter.com"><img src="/assets/twitter-x.svg" alt="twitter-svg" title='Twitter'/></a>
                            <a className='Footer-icon' href="www.instagram.com"><img src="/assets/tiktok.svg" alt="tiktok-svg" title='Tik Tok'/></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}