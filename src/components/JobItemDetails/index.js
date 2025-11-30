import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobCard from '../JobCard'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobItemDetails: null,
    similarJobsList: [],
  }

  componentDidMount() {
    this.fetchJobDetails()
  }

  formatJobItem = job => ({
    id: job.id,
    title: job.title,
    location: job.location,
    rating: job.rating,
    jobDescription: job.job_description,
    employmentType: job.employment_type,
    companyLogoUrl: job.company_logo_url,
    companyWebsiteUrl: job.company_website_url,
    packagePerAnnum: job.package_per_annum,
    lifeAtCompany: {
      description: job.life_at_company?.description || '',
      imageUrl: job.life_at_company?.image_url || '',
    },
    skills:
      job.skills?.map(skill => ({
        name: skill.name,
        imageUrl: skill.image_url,
      })) || [],
  })

  formatSimilarJobItem = job => ({
    id: job.id,
    title: job.title,
    location: job.location,
    jobDescription: job.job_description,
    employmentType: job.employment_type,
    companyLogoUrl: job.company_logo_url,
    rating: job.rating,
  })

  fetchJobDetails = async jobItemId => {
    const {match} = this.props
    const {params} = match
    const id = jobItemId || params.id
    const jwtToken = Cookies.get('jwt_token')
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobItemDetails = this.formatJobItem(data.job_details)
      const similarJobsList = data.similar_jobs.map(similarJob =>
        this.formatSimilarJobItem(similarJob),
      )
      this.setState({
        jobItemDetails,
        similarJobsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onItemChange = id => {
    this.fetchJobDetails(id)
  }

  onClickJobItemDetailsRetry = () => {
    this.fetchJobDetails()
  }

  renderJobItemDetailsSuccessView = () => {
    const {jobItemDetails, similarJobsList} = this.state
    return (
      <div className="job-item-details-success-container">
        <JobCard jobDetails={jobItemDetails} />
        <div className="similar-job-items-container">
          <h1 className="similar-job-items-heading">Similar Jobs</h1>
          <ul className="similar-job-items-menu">
            {similarJobsList.map(similarJob => (
              <SimilarJobItem
                key={similarJob.id}
                similarJobDetails={similarJob}
                onItemChange={this.onItemChange}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobItemDetailsLoadingView = () => (
    <div className="job-item-details-loading-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderJobItemDetailsFailureView = () => (
    <div className="job-item-details-failure-container">
      <img
        className="job-item-details-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <div className="job-item-details-failure">
        <h1 className="job-item-details-failure-heading">
          Oops! Something Went Wrong
        </h1>
        <p className="job-item-details-failure-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          className="job-item-details-retry-btn"
          type="button"
          onClick={this.onClickJobItemDetailsRetry}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetailsSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderJobItemDetailsLoadingView()
      case apiStatusConstants.failure:
        return this.renderJobItemDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderView()}
      </>
    )
  }
}

export default JobItemDetails
