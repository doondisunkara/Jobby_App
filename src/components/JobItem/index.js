import {Link} from 'react-router-dom'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {FaLocationDot} from 'react-icons/fa6'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    location,
    rating,
    jobDescription,
    employmentType,
    companyLogoUrl,
    packagePerAnnum,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`}>
      <li className="job-item-container">
        <div className="job-item-company-details-content">
          <img
            className="job-item-company-img"
            src={companyLogoUrl}
            alt={title}
          />
          <div className="job-item-role-details">
            <h1 className="job-item-role">{title}</h1>
            <div className="job-item-rating-container">
              <BsStarFill className="job-item-rating-icon" />
              <p className="job-item-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-item-details-content">
          <div className="job-item-details">
            <div className="job-item-extra-details">
              <FaLocationDot className="job-item-icon" />
              <p className="job-item-icon-title">{location}</p>
            </div>
            <div className="job-item-extra-details">
              <BsBriefcaseFill className="job-item-icon" />
              <p className="job-item-icon-title">{employmentType}</p>
            </div>
          </div>
          <h1 className="job-item-package">{packagePerAnnum}</h1>
        </div>
        <div className="job-item-description-content">
          <h1 className="job-item-description-heading">Description</h1>
          <p className="job-item-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
