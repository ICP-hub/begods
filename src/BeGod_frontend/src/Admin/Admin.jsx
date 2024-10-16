import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import DashBoard from "./DashBoard";
import Collection from "./collection/Collection";
import Users from "./Users";
import CollectionDetails from "./collection/CollectionDetails";
import NftDetails from "./collection/NftDetails";
import CreateCollection from "./collection/CreateCollection";
import UserDetails from "./UserDetails";
import PageNotFound from "./PageNotFound";
import Useractivity from "./Useractivity";
import Allorder from "./Allorder";
import AllorderDetails from "./AllorderDetails";

function Admin() {
  const [isOpen, setIsOpen] = useState(false);

  // Access the authentication state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("in admin page", isAuthenticated);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Conditional rendering based on isAuthenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div
      className="flex flex-col items-start justify-center lg:flex-row md:flex-row sm:flex-col admin-control-font"
      style={{ fontFamily: "sans-serif !importent" }}
    >
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} className="" />
      <div className="flex items-center justify-center w-full">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/create" element={<CreateCollection />} />
          <Route
            path="/collection/collectionDetails/:id"
            element={<CollectionDetails />}
          />
          <Route
            path="/collection/collectionDetails/:collectionId/nft/:nftId"
            element={<NftDetails />}
          />
          <Route path="/users/" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/activity" element={<Useractivity />} />
          <Route path="/activity/allorder/" element={<Allorder />} />
          <Route path="/activity/allorder/:id" element={<AllorderDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
