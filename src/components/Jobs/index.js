import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    salaryRange: 0,
    employmentType: [],
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
  }

  componentDidMount() {
    this.fetchJobs()
  }

  formatJobItem = job => ({
    id: job.id,
    title: job.title,
    location: job.location,
    jobDescription: job.job_description,
    employmentType: job.employment_type,
    companyLogoUrl: job.company_logo_url,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
  })

  fetchJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, salaryRange, employmentType} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobsList = data.jobs.map(job => this.formatJobItem(job))
      console.log(jobsList)
      this.setState({
        jobsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickJobsRetry = () => {
    this.fetchJobs()
  }

  onClickSearch = () => {
    this.fetchJobs()
  }

  renderInputSearch = () => {
    const {searchInput} = this.state
    return (
      <div className="input-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={this.changeSearchInput}
        />
        <button
          className="search-btn"
          type="button"
          onClick={this.onClickSearch}
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderNoJobsView = () => (
    <div className="no-jobs-failure-container">
      <img
        className="no-jobs-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-failure-heading">No Jobs Found</h1>
      <p className="no-jobs-failure-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsView = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list-container">
        {jobsList.map(job => (
          <JobItem key={job.id} jobDetails={job} />
        ))}
      </ul>
    )
  }

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.renderNoJobsView()
    }
    return this.renderJobsView()
  }

  renderJobsFailureView = () => (
    <div className="no-jobs-failure-container">
      <img
        className="no-jobs-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="no-jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="jobs-retry-btn"
        type="button"
        onClick={this.onClickJobsRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobsLoadingView = () => (
    <div className="jobs-loading-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderJobsLoadingView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-container">
            <Profile />
          </div>
          <div className="jobs-content">
            {this.renderInputSearch()}
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
