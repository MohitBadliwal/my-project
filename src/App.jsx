import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import PostListProvider from "./store/Post-list-store";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <PostListProvider>
      <div className="app-container">
        <Sidebar />

        <div className="content">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}
