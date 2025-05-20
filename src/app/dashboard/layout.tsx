import Nav from "@/components/common/nav";
import React from "react";
import AddSheet from "./_components/add-sheet";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Nav />
      <AddSheet />
      {children}
    </>
  );
};

export default Layout;
