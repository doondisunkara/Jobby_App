import {Link} from 'react-router-dom'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {FaLocationDot} from 'react-icons/fa6'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails, onItemChange} = props
  const {
    id,
    title,
    location,
    rating,
    jobDescription,
    employmentType,
    companyLogoUrl,
  } = similarJobDetails

  const onClickSimilarItem = () => {
    onItemChange(id)
  }

  return (
    <Link
      to={`/jobs/${id}`}
      className="similar-job-item"
      onClick={onClickSimilarItem}
    >
      <li>
        <div className="similar-job-item-details-content">
          <img
            className="similar-job-item-company-img"
            src={companyLogoUrl}
            alt={title}
          />
          <div className="similar-job-item-role-details">
            <h1 className="similar-job-item-role">{title}</h1>
            <div className="similar-job-item-rating-container">
              <BsStarFill className="similar-job-item-rating-icon" />
              <p className="similar-job-item-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="similar-job-item-description-content">
          <h1 className="similar-job-item-description-heading">Description</h1>
          <p className="similar-job-item-description">{jobDescription}</p>
        </div>
        <div className="similar-job-item-details-content">
          <div className="similar-job-item-details">
            <FaLocationDot className="similar-job-item-icon" />
            <p className="similar-job-item-icon-title">{location}</p>
          </div>
          <div className="similar-job-item-details">
            <BsBriefcaseFill className="similar-job-item-icon" />
            <p className="similar-job-item-icon-title">{employmentType}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobItem
