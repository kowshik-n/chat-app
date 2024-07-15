import React, { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchDialog = lazy(() => import("../specific/SearchDialog"));
const NotifcationDialog = lazy(() => import("../specific/NotificationDialog"));
const NewGroupDialog = lazy(() => import("../specific/NewGroupDialog"));
const Header = () => {
  const navigate = useNavigate();

  const [isSearch, setIsSearch] = useState(false);
  const [isOpenNewGroup, setOpenNewGroup] = useState(false);
  const [isNotification, setNotification] = useState(false);
  const [isNavigateToGroup, setNavigateToGroup] = useState(false);

  const openSearchDialog = () => {
    setIsSearch((prev) => !prev);
  };
  const openNewGroup = () => {
    setOpenNewGroup((prev) => !prev);
  };
  const navigateToGroup = () => {
    navigate("/groups");
  };

  const notification = () => {
    setNotification((prev) => !prev);
  };
  return (
    <div className="flex justify-end items-end gap-5">
      <div onClick={openSearchDialog}>Search</div>
      <div onClick={openNewGroup}>
        <NewGroupDialog />
      </div>
      <div onClick={navigateToGroup}>NavigateToGroup</div>
      <div onClick={notification}>Notification</div>
      {isSearch && (
        <Suspense fallback={<div>Loading...</div>}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<div>Loading...</div>}>
          <NotifcationDialog />
        </Suspense>
      )}

      {isOpenNewGroup && (
        <Suspense fallback={<div>Loading...</div>}>
          <NewGroupDialog />
        </Suspense>
      )}
    </div>
  );
};

export default Header;
