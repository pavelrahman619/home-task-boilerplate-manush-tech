import React from "react";
import LogoutButton from "../../components/Global/LogoutButton";
import { Link } from "react-router-dom";
import { PRODUCT_MANAGEMENT } from "../../constants/AppUrls";

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      <Link to={PRODUCT_MANAGEMENT}>Go to Product Management</Link>
      <LogoutButton />
    </div>
  )
};

export default Dashboard;
