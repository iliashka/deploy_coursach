import React from 'react'
import { Link } from 'react-router-dom'

function Footer(lang) {
    return (
            <footer className='footer font-small pt-4'>
                <div className="container d-flex justify-content-center">
                    <button className='mr-4 btn btn-primary'><a href="https://www.facebook.com/profile.php?id=100008033059168"><i class="bi bi-facebook"></i></a></button>
                    <button className='mr-4 btn btn-primary'><a href="https://www.linkedin.com/in/ilya-zubko-a037711b4/"><i class="bi bi-linkedin"></i></a></button>
                    <button className='btn btn-primary'><a href="https://github.com/iliashka"><i class="bi bi-github"></i></a></button>
                </div>
                <div className="footer-copyright text-center py-3">
                    <Link to='/Privacy'>{lang===false?'Privacy politics':'Политика конфиденциальности'}</Link>
                </div>
            </footer>

    )
}

export default Footer
