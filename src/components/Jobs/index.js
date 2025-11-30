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
    employmentTypes: [],
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
    const {searchInput, salaryRange, employmentTypes} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes.join(
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

  onChangeEmployment = event => {
    const newEmploymentType = event.target.value
    if (event.target.checked === true) {
      this.setState(
        prev => ({
          employmentTypes: [...prev.employmentTypes, newEmploymentType],
        }),
        this.fetchJobs,
      )
    } else {
      this.setState(
        prev => ({
          employmentTypes: prev.employmentTypes.filter(
            id => id !== newEmploymentType,
          ),
        }),
        this.fetchJobs,
      )
    }
  }

  onChangeSalary = event => {
    if (event.target.checked === true) {
      this.setState(
        {
          salaryRange: event.target.value,
        },
        this.fetchJobs,
      )
    }
  }

  renderInputSearch = inputView => {
    const {searchInput} = this.state
    const inputContainerClassName =
      inputView === true ? 'input-container' : 'mobile-input-container'
    return (
      <div className={inputContainerClassName}>
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

  renderCheckbox = employment => (
    <li className="jobs-filter-item">
      <input
        className="jobs-filter-input"
        id={employment.employmentTypeId}
        type="checkbox"
        value={employment.employmentTypeId}
        onChange={this.onChangeEmployment}
      />
      <label
        className="jobs-filter-label"
        htmlFor={employment.employmentTypeId}
      >
        {employment.label}
      </label>
    </li>
  )

  renderRadioInput = salary => (
    <li className="jobs-filter-item">
      <input
        className="jobs-filter-input"
        id={salary.salaryRangeId}
        type="radio"
        name="salary"
        value={salary.salaryRangeId}
        onChange={this.onChangeSalary}
      />
      <label className="jobs-filter-label" htmlFor={salary.salaryRangeId}>
        {salary.label}
      </label>
    </li>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-failure-container">
      <img
        className="no-jobs-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <div className="no-jobs-failure-details">
        <h1 className="no-jobs-failure-heading">No Jobs Found</h1>
        <p className="no-jobs-failure-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
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
      <div className="no-jobs-failure-details">
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
            {this.renderInputSearch(false)}
            <Profile />
            <div className="jobs-filter-container">
              <h1 className="jobs-filter-heading">Type of Employment</h1>
              <ul className="jobs-filter-menu">
                {employmentTypesList.map(employment =>
                  this.renderCheckbox(employment),
                )}
              </ul>
            </div>
            <div className="jobs-filter-container">
              <h1 className="jobs-filter-heading">Salary Range</h1>
              <ul className="jobs-filter-menu">
                {salaryRangesList.map(salary => this.renderRadioInput(salary))}
              </ul>
            </div>
          </div>
          <div className="jobs-content">
            {this.renderInputSearch(true)}
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
