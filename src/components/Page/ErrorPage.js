import React from "react";
import { AiOutlineMeh } from "react-icons/ai";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-conteiner">
        <AiOutlineMeh className="error-icon" />
        <h1 className="error-title">
          Error 404 <br />
          page does not exist
        </h1>
      </div>
    </div>
  );
};
export default ErrorPage;
