import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import University from "../../models/University";
import "./UniversityDetailsPage.css";

const UniversityDetailsPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [university, setUniversity] = useState<University | null>(null);

  useEffect(() => {
    const universitiesData = localStorage.getItem("universities");
    if (universitiesData) {
      const universities: University[] = JSON.parse(universitiesData);
      const foundUniversity = universities.find((uni) => uni.name === name);
      if (foundUniversity) {
        setUniversity(foundUniversity);
      }
    }
  }, [name]);

  return (
    <div className="details-page">
      <div className="details-content">
        <Link to="/" className="back-button">
          <span>&#8592;</span> Back to List
        </Link>
        {university ? (
          <div className="details-card">
            <div className="card-header">
              <h1 className="details-title">{university.name}</h1>
              <div className="university-icon">🎓</div>
            </div>
            <div className="details-grid">
              <div className="detail-item">
                <h3>Country</h3>
                <p>{university.country}</p>
              </div>
              <div className="detail-item">
                <h3>Domain</h3>
                <p>{university.domains && university.domains.length > 0
                  ? university.domains[0]
                  : "N/A"}
                </p>
              </div>
              <div className="detail-item website">
                <h3>Website</h3>
                {university.web_pages && university.web_pages.length > 0 ? (
                  <a
                    className="details-link"
                    href={university.web_pages[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                ) : (
                  <p>N/A</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="not-found">
            <h2>University not found</h2>
            <p>We couldnt find the university you are looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityDetailsPage;