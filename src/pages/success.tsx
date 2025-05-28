import React from "react";
import { Link } from "react-router-dom";

const Success: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.checkmark}>✓</div>
      <div style={styles.successMessage}>
        Byagenze neza, ibyo ukoze byakunze
      </div>
      <Link to="/" style={styles.backButton}>
        Subira ku rubuga rwawe
      </Link>
    </div>
  );
};

const styles = {
  container: {  
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    color: "black",
    textAlign: "center" as "center",
  },
  successMessage: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#4CAF50",
  },
  backButton: {
    backgroundColor: "#1E90FF",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    textDecoration: "none",
    display: "inline-block",
  },
  checkmark: {
    color: "#4CAF50",
    fontSize: "60px",
    marginBottom: "20px",
  },
};


export default Success;
