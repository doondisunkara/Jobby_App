import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  changeUserName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  changePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      errorMsg,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    if (username !== '' && password !== '') {
      const apiUrl = 'https://apis.ccbp.in/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    } else if (username === '') {
      this.setState({
        errorMsg: '*Username is needed',
      })
    } else {
      this.setState({
        errorMsg: '*Password is needed',
      })
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const displayError = errorMsg !== ''
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-content">
          <img
            className="login-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="login-form" onSubmit={this.submitForm}>
            <label className="login-form-label" htmlFor="username">
              USERNAME
            </label>
            <input
              id="username"
              className="login-form-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={this.changeUserName}
            />
            <label className="login-form-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              id="password"
              className="login-form-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.changePassword}
            />
            <button className="submit-btn" type="submit">
              Login
            </button>
            {displayError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
