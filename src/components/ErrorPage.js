import React from 'react';
import "../styles/ErrorPage.css";

const ErrorPage = ({ message }) => {
  return (
    <div>
      <h2>Error</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
