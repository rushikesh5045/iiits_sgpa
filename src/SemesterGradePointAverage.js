
import React, { useState } from 'react';
import './sgpa.css';
    

const gradePoints = {
  'O': 10,
  'A': 9,
  'B': 8,
  'C': 7,
  'D': 6,
  'P': 5,
  'F': 0,
};

const IIITSricitySGPACalculator = () => {
  const [subjects, setSubjects] = useState([{ grade: '', credit: '' }]);
  const [sgpa, setSGPA] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleGradeChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].grade = value.toUpperCase();
    setSubjects(updatedSubjects);
  };

  const removeSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
  };
  const handleCreditChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].credit = value;
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { grade: '', credit: '' }]);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeAndResetModal = () => {
    setShowModal(false);
    setSGPA(null);
    setSubjects([{ grade: '', credit: '' }]);
  };

  const calculateSGPA = () => {
    for (let i = 0; i < subjects.length; i++) {
      const credit = parseFloat(subjects[i].credit);
      const grade = subjects[i].grade;

      if (!gradePoints.hasOwnProperty(grade)) {
        setModalMessage(`Invalid grade for Subject ${i + 1}. Please enter a valid grade (O, A, B, C, D, P, F).`);
        setShowModal(true);
        return;
      }
      if (isNaN(credit) || credit < 2 || credit > 4) {
        setModalMessage(`Invalid credits for Subject ${i + 1}. Please enter a value between 2 and 4.`);
        setShowModal(true);
        return;
      }

    }

    let totalCredits = 0;
    let totalWeightedGradePoints = 0;

    subjects.forEach((subject) => {
      const credit = parseFloat(subject.credit);
      const grade = subject.grade;

      totalCredits += credit;
      totalWeightedGradePoints += credit * gradePoints[grade];
    });

    const calculatedSGPA = totalWeightedGradePoints / totalCredits;
    setSGPA(calculatedSGPA.toFixed(2));

    // Show success message
    setModalMessage(`SGPA calculated successfully.`);
    setShowModal(true);
  };

  return (
    <div className="container">
      <h1>IIIT Sricity SGPA Calculator</h1>
      {subjects.map((subject, index) => (
        <div
          key={index}
          className={`subject-container animate__animated ${
             index === subjects.length - 1 ? "animate__flipInX" : ""
          }`}
        >
          <div className="subject-header">
            Subject {index + 1}
             <button onClick={() => removeSubject(index)} className="remove-button">
              Remove
            </button>
          </div>
          <div className="input-row">
            <label>Grades:</label>
            <input
              type="text"
              value={subject.grade}
              onChange={(e) => handleGradeChange(index, e.target.value)}
            />
            <label className='credit-class'>Credits:</label>
            <input
              type="text"
              value={subject.credit}
              onChange={(e) => handleCreditChange(index, e.target.value)}
            />
          </div>
        </div>
      ))}
      <button onClick={addSubject}>Add Subject</button>
      <button onClick={calculateSGPA}>Calculate SGPA</button>
      <br />
      {sgpa !== null && <p>Your SGPA: {sgpa}</p>}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            {modalMessage.includes("calculated successfully") ? (
              <>
                <p>{modalMessage}</p>
                <p>Your SGPA: {sgpa}</p>
                <button onClick={() => { closeAndResetModal(); }}>OK</button>
              </>
            ) : (
              <>
                <p>{modalMessage}</p>
                <button onClick={closeModal}>OK</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IIITSricitySGPACalculator;
