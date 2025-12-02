import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoExitOutline} from 'react-icons/io5'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    console.log(history)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-bar-desktop-container">
        <Link to="/" className="nav-links">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/jobs" className="nav-links">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="desktop-logout-btn" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="nav-bar-mobile-container">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="logo"
        />
        <ul className="nav-menu-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-links">
              <AiFillHome className="nav-icons-mobile" />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/jobs" className="nav-links">
              <BsBriefcaseFill className="nav-icons-mobile" />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <button
              className="mobile-logout-btn"
              type="button"
              onClick={onLogout}
            >
              <IoExitOutline className="nav-icons-mobile" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
