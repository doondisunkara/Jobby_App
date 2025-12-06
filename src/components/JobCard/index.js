import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt, FaMapMarkerAlt} from 'react-icons/fa'

import './index.css'

const renderSkillItem = skill => {
  const {name, imageUrl} = skill
  return (
    <li className="job-card-skill-item" key={name}>
      <img className="job-card-skill-img" src={imageUrl} alt={name} />
      <h1 className="job-card-skill-name">{name}</h1>
    </li>
  )
}

const JobCard = props => {
  const {jobDetails} = props
  const {
    title,
    location,
    rating,
    jobDescription,
    employmentType,
    companyLogoUrl,
    companyWebsiteUrl,
    packagePerAnnum,
    lifeAtCompany,
    skills,
  } = jobDetails
  return (
    <div className="job-card">
      <div className="job-card-company-details-content">
        <img
          className="job-card-company-img"
          src={companyLogoUrl}
          alt="job details company logo"
        />
        <div className="job-card-role-details">
          <h1 className="job-card-role">{title}</h1>
          <div className="job-card-rating-container">
            <BsStarFill className="job-card-rating-icon" />
            <p className="job-card-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="job-card-details-content">
        <div className="job-card-details">
          <div className="job-card-extra-details">
            <FaMapMarkerAlt className="job-card-icon" />
            <p className="job-card-icon-title">{location}</p>
          </div>
          <div className="job-card-extra-details">
            <BsBriefcaseFill className="job-card-icon" />
            <p className="job-card-icon-title">{employmentType}</p>
          </div>
        </div>
        <p className="job-card-package">{packagePerAnnum}</p>
      </div>
      <div className="job-card-description-content">
        <div className="job-card-description-header">
          <h1 className="job-card-sub-heading">Description</h1>
          <a className="job-card-nav-content" href={companyWebsiteUrl}>
            <p className="job-card-visit-label">Visit</p>
            <FaExternalLinkAlt className="job-card-visit-icon" />
          </a>
        </div>
        <p className="job-card-description">{jobDescription}</p>
      </div>
      <div className="job-card-skills-content">
        <h1 className="job-card-sub-heading">Skills</h1>
        <ul className="job-card-skills-menu">
          {skills.map(skill => renderSkillItem(skill))}
        </ul>
      </div>
      <div className="job-card-life-at-company-content">
        <h1 className="job-card-sub-heading">Life at Company</h1>
        <div className="job-card-life-at-company-details">
          <p className="job-card-description job-card-life-at-company-description">
            {lifeAtCompany.description}
          </p>
          <img
            className="job-card-life-at-company-img"
            src={lifeAtCompany.imageUrl}
            alt="life at company"
          />
        </div>
      </div>
    </div>
  )
}

export default JobCard
