import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import BibleReader from './pages/BibleReader'
import AIStudy from './pages/AIStudy'
import Devotionals from './pages/Devotionals'
import SermonBuilder from './pages/SermonBuilder'
import Community from './pages/Community'
import Profile from './pages/Profile'
import ReadingPlans from './pages/ReadingPlans'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="bible" element={<BibleReader />} />
          <Route path="ai-study" element={<AIStudy />} />
          <Route path="devotionals" element={<Devotionals />} />
          <Route path="sermons" element={<SermonBuilder />} />
          <Route path="community" element={<Community />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reading-plans" element={<ReadingPlans />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}