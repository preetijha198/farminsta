import { useState, useEffect } from "react";

const SearchAndFilter = ({ users, onSearchAndFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState([]);

  // Extract unique values for each filter type with validation
  const uniqueLanguages = [
    ...new Set(
      (users || [])
        .flatMap((user) => user.languages?.split(", ") || []) // Handle missing languages
    ),
  ];

  const uniqueEducation = [
    ...new Set((users || []).map((user) => user.education || "")), // Handle missing education
  ];

  const uniqueSpecialization = [
    ...new Set(
      (users || [])
        .flatMap((user) => user.specialization?.split(", ") || []) // Handle missing specialization
    ),
  ];

  // Handle changes in search and filter
  useEffect(() => {
    onSearchAndFilter({
      searchTerm,
      selectedLanguages,
      selectedEducation,
      selectedSpecialization,
    });
  }, [searchTerm, selectedLanguages, selectedEducation, selectedSpecialization]);

  return (
    <div className="mb-6">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Languages Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">Filter by Languages</h3>
        {uniqueLanguages.length > 0 ? (
          uniqueLanguages.map((language) => (
            <label key={language} className="block">
              <input
                type="checkbox"
                value={language}
                checked={selectedLanguages.includes(language)}
                onChange={(e) => {
                  const newLanguages = e.target.checked
                    ? [...selectedLanguages, language]
                    : selectedLanguages.filter((lang) => lang !== language);
                  setSelectedLanguages(newLanguages);
                }}
              />
              {language}
            </label>
          ))
        ) : (
          <p>No languages available</p>
        )}
      </div>

      {/* Education Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">Filter by Education</h3>
        {uniqueEducation.length > 0 ? (
          uniqueEducation.map((edu) => (
            <label key={edu} className="block">
              <input
                type="checkbox"
                value={edu}
                checked={selectedEducation.includes(edu)}
                onChange={(e) => {
                  const newEducation = e.target.checked
                    ? [...selectedEducation, edu]
                    : selectedEducation.filter((education) => education !== edu);
                  setSelectedEducation(newEducation);
                }}
              />
              {edu}
            </label>
          ))
        ) : (
          <p>No education options available</p>
        )}
      </div>

      {/* Specialization Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">Filter by Specialization</h3>
        {uniqueSpecialization.length > 0 ? (
          uniqueSpecialization.map((spec) => (
            <label key={spec} className="block">
              <input
                type="checkbox"
                value={spec}
                checked={selectedSpecialization.includes(spec)}
                onChange={(e) => {
                  const newSpecialization = e.target.checked
                    ? [...selectedSpecialization, spec]
                    : selectedSpecialization.filter((specialization) => specialization !== spec);
                  setSelectedSpecialization(newSpecialization);
                }}
              />
              {spec}
            </label>
          ))
        ) : (
          <p>No specialization options available</p>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
