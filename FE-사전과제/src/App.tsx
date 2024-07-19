import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from '../public/Header';
import StartupList from '../public/StartupList/StartupList';
import Menu from '../public/Menu/Menu';
import BookmarkList from '../public/BookmarkList/BookmarkList';
import { Startup } from '../public/StartupList/StartupList';

const AppContent: React.FC = () => {
  const location = useLocation();

  // 상태 관리
  const [startups, setStartups] = useState<Startup[]>([]);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchBookmarkedStartups = async () => {
      try {
        const response = await fetch('/api/startups/bookmark', {
          headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // 적절한 인증 헤더를 추가합니다.
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBookmarks(new Set(data.companies.map((startup: Startup) => startup.id)));
        } else {
          console.error('Failed to fetch bookmarks:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBookmarkedStartups();
  }, []);

  const toggleBookmark = async (id: string) => {
    const updatedBookmarks = new Set(bookmarks);
    if (updatedBookmarks.has(id)) {
      updatedBookmarks.delete(id);
    } else {
      updatedBookmarks.add(id);
    }
    setBookmarks(updatedBookmarks);

    // Call the API to update the bookmark status
    try {
      const response = await fetch('/api/startups/bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // 적절한 인증 헤더를 추가합니다.
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        console.error('Failed to update bookmark:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  return (
    <>
      {location.pathname !== '/menu' && <Header />}
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/bookmark" element={<BookmarkList startups={startups} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
        <Route path="/" element={<StartupList startups={startups} setStartups={setStartups} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

