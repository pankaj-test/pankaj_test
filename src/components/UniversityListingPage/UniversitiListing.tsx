import React, { useState, useEffect } from "react";
import University from "../../models/University";
import UniversityListingController from "./UniversityListingController";
import './UniversityListing.css';
import SearchBar from "../common/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import SortingToggle from "../common/SortingToggle/SortingToggle";
import "../../App.css";

const UniversityListing: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UniversityListingController.fetchUniversities();
        setUniversities(data);
      } catch (error) {
        setError("Failed to load universities. Please try again later.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = universities.filter((university) =>
      university.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUniversities(filtered);
  }, [searchTerm, universities]);

  const handleDelete = (name: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this university? This action cannot be reverted."
    );
    if (confirmDelete) {
      const updatedUniversities = universities.filter(
        (university) => university.name !== name
      );
      setUniversities(updatedUniversities);
      localStorage.setItem("universities", JSON.stringify(updatedUniversities));
    }
  };

  const handleSort = (value: string) => {
    const sorted =
      value === ""
        ? universities
        : [...filteredUniversities].sort((a, b) => {
            return value === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          });

    setSortOrder(value);
    setFilteredUniversities(sorted);
  };

  return (
      <div className="listing-page">
        <header className="header">
          <h1>Discover Universities</h1>
          <div className="filters">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <SortingToggle onChange={handleSort} /></div>
        </header>
        {error && <div className="error-message">{error}</div>}
        <div className="university-grid">
          {filteredUniversities.map((university) => (
            <div key={university.name} className="university-card">
              <div className="card-inner">
                <div className="card-front">
                  <h2 className="card-title">{university.name}</h2>
                </div>
                <div className="card-back">
                  <p className="card-country">Located in {university.country}</p>
                  <div className="card-actions">
                    <button
                      className="card-button delete-button"
                      onClick={() => handleDelete(university.name)}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/university/${encodeURIComponent(university.name)}`}
                      className="card-button view-button"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default UniversityListing;