import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData, addFilter, removeFilter, clearFilters } from '../redux/dataSlice';
import jobsData from '../../redux-toolkit-homework/data.json';
import { Card, Button, Nav } from 'react-bootstrap';


const JobList = () => {
  const dispatch = useDispatch();
  const { data, filters } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(setData(jobsData));
  }, []);

  const handleFilterClick = (type, value) => {
    dispatch(addFilter({ type, value }));
  };

  const handleRemoveFilter = (type, value) => {
    dispatch(removeFilter({ type, value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const filteredJobs = data.filter((job) => {
    const matchesRole = filters.role ? job.role === filters.role : true;
    const matchesLevel = filters.level ? job.level === filters.level : true;
    const matchesLanguages = filters.languages.every(lang => job.languages.includes(lang));

    return matchesRole && matchesLevel && matchesLanguages;
  });

  return (
    <div>
      <Nav className="mb-3">
        {filters.role && (
          <Nav.Item>
            <Nav.Link onClick={() => handleRemoveFilter('role', filters.role)}>
              {filters.role} ✕
            </Nav.Link>
          </Nav.Item>
        )}
        {filters.level && (
          <Nav.Item>
            <Nav.Link onClick={() => handleRemoveFilter('level', filters.level)}>
              {filters.level} ✕
            </Nav.Link>
          </Nav.Item>
        )}
        {filters.languages.map((lang, index) => (
          <Nav.Item key={index}>
            <Nav.Link onClick={() => handleRemoveFilter('languages', lang)}>
              {lang} ✕
            </Nav.Link>
          </Nav.Item>
        ))}

        {(filters.role || filters.level || filters.languages.length > 0) && (
          <Button variant="link" onClick={handleClearFilters} style={{ marginLeft: '10px' }}>
            Clear
          </Button>
        )}
      </Nav>

      <div className="job-list">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="mb-3 job-card">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <img src={job.logo} alt={job.company} className="company-logo" />
                  <div className="flex-grow-1">
                    <h5>{job.company} 
                      {job.new && <span className="badge bg-success mx-1">New</span>}
                      {job.featured && <span className="badge bg-dark">Featured</span>}
                    </h5>
                    <h6>{job.position}</h6>
                    <p className="job-details">{job.postedAt} - {job.contract} - {job.location}</p>
                  </div>
                </div>
                <div className="mt-3 d-flex flex-wrap gap-2">
                  <Button variant="outline-primary" onClick={() => handleFilterClick('role', job.role)}>{job.role}</Button>
                  <Button variant="outline-primary" onClick={() => handleFilterClick('level', job.level)}>{job.level}</Button>
                  {job.languages.map((language, index) => (
                    <Button key={index} variant="outline-primary" onClick={() => handleFilterClick('languages', language)}>
                      {language}
                    </Button>
                  ))}
                  {job.tools.map((tool, index) => (
                    <Button key={index} variant="outline-primary" onClick={() => handleFilterClick('tools', tool)}>
                      {tool}
                    </Button>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobList;
