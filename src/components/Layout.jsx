import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Layout = ({ children }) => {
  return (
      <div className="flex-grow overflow-auto py-8 px-12 md:px-36 bg-background">
       
        <main>{children}</main>
      </div>
  );
};

export default Layout;
