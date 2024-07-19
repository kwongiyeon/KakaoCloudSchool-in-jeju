// import React, { FC } from 'react';
// import './BookmarkList.css';
// import { Startup, Card } from '../StartupList/StartupList';

// const BookmarkList: FC<{ startups: Startup[], bookmarks: Set<number>, toggleBookmark: (index: number) => void }> = ({ startups, bookmarks, toggleBookmark }) => {
//   const bookmarkedStartups = startups.filter((_, index) => bookmarks.has(index));

//   return (
//     <div className="bookmark-page">
//       <h1>북마크</h1>
//       <div className="cards-container">
//         {bookmarkedStartups.map((startup, index) => (
//           <Card
//             key={index}
//             title={startup.title}
//             tag={startup.tag}
//             description={startup.description}
//             bookmarked={bookmarks.has(index)}
//             onBookmarkToggle={() => toggleBookmark(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BookmarkList;

import { useState, FC } from 'react';
import './BookmarkList.css';
import { Startup, Card } from '../StartupList/StartupList';

const BookmarkList: FC<{ startups: Startup[]; bookmarks: Set<string>; toggleBookmark: (id: string) => void }> = ({ startups, bookmarks, toggleBookmark }) => {
  const bookmarkedStartups = startups.filter((startup) => bookmarks.has(startup.id));

  return (
    <div className="bookmark-page">
      <h1>북마크</h1>
      <div className="cards-container">
        {bookmarkedStartups.map((startup) => (
          <Card
            key={startup.id}
            id={startup.id}
            title={startup.title}
            tag={startup.tag}
            description={startup.description}
            bookmarked={bookmarks.has(startup.id)}
            onBookmarkToggle={() => toggleBookmark(startup.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarkList;


