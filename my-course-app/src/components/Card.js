import React from "react"
import { Link } from "react-router-dom"
import styles from "./Card.module.scss"

const Card = ({ image, name, description, onClick }) => {
  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <img
        src={image || "https://via.placeholder.com/150"}
        className="card-img-top"
        alt={name}
      />
      <h5 className={styles.cardTitle}>{name}</h5>
      <p className={styles.cardText}>{description}</p>
      <Link to="#" className="btn btn-primary">
        Buy Course
      </Link>
    </div>
  )
}

export default Card
