// import React, { useState, useEffect, useCallback, FC } from 'react';
// import axios from 'axios';
// import './StartupList.css';
// import BookmarkIcon from './BookmarkIcon';

// export type Startup = {
//   id: string;
//   tag: string;
//   title: string;
//   description: string;
// };

// interface CardProps {
//   title: string;
//   tag: String;
//   description: string;
//   bookmarked: boolean;
//   onBookmarkToggle: () => void;
// }

// export const Tag = () => {
//   const ret = ['생산성', '메타버스', '데이터', '펫테크', '아트테크'];
//   const [tags] = useState(ret);
// };

// export const Card: FC<CardProps> = ({ title, tag, description, bookmarked, onBookmarkToggle }) => {
//   return (
//     <div className="card">
//       <div className="card-header">
//         <p>{tag}</p>
//       </div>
//       <div className="card-body">
//         <h2>{title}</h2>
//         <p>{description}</p>
//         <div className="bookmark">
//           <BookmarkIcon />
//         </div>
//       </div>
//     </div>
//   );
// };

// interface StartupListProps {
//   startups: any[];
//   setStartups: React.Dispatch<React.SetStateAction<any[]>>;
//   bookmarks: Set<number>;
//   toggleBookmark: (index: number) => void;
// }

// const StartupList: FC<StartupListProps> = ({ startups, setStartups, bookmarks, toggleBookmark }) => {
//   const [offset, setOffset] = useState(0);
//   const limit = 12;
//   const maxItems = 72;
//   const [loading, setLoading] = useState(false);

//   const fetchStartups = useCallback(async () => {
//     if (loading || offset >= maxItems) return;
//     setLoading(true);
//     try {
//       const response = await axios.get('/api/startups', {
//         params: {
//           offset,
//           limit,
//         },
//       });

//       console.log('API Response:', response.data);

//       if (response.data && Array.isArray(response.data.startups)) {
//         setStartups(prev => [...prev, ...response.data.startups]);
//       } else {
//         console.error('Unexpected response data format:', response.data);
//       }

//       setOffset(prev => prev + limit);
//     } catch (error) {
//       console.error('Error fetching startups:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [offset, limit, loading, setStartups]);

//   useEffect(() => {
//     fetchStartups();
//   }, [fetchStartups]);

//   const handleScroll = useCallback(() => {
//     const scrollHeight = window.innerHeight + window.scrollY;
//     const documentHeight = document.body.offsetHeight;

//     if (scrollHeight >= documentHeight && !loading) {
//       fetchStartups();
//     }
//   }, [fetchStartups, loading]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [handleScroll]);

//   return (
//     <div className="startup-list">
//       <h1>스타트업 리스트</h1>
//       <div className="cards-container">
//         {startups.map((startup, index) => (
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
//       {loading && <div>Loading...</div>}
//     </div>
//   );
// };

// export default StartupList;

import React, { useEffect, useState, FC } from 'react';
import './StartupList.css';
import BookmarkIcon from './BookmarkIcon';

export type Startup = {
  id: string;
  tag: string;
  title: string;
  description: string;
};

type StartupListProps = {
  startups: Startup[];
  setStartups: React.Dispatch<React.SetStateAction<Startup[]>>;
  bookmarks: Set<string>;
  toggleBookmark: (id: string) => void;
};

const textcut = (str: string, n: number) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

export const Card: FC<{ id: string; title: string; tag: string; description: string; bookmarked: boolean; onBookmarkToggle: () => void }> = ({
  id,
  title,
  tag,
  description,
  bookmarked,
  onBookmarkToggle,
}) => (
  <div className="card">
    <div className="card-header">
      <div className='tag'>{tag}</div>
    </div>
    <div className="card-body">
      <h2>{title}</h2>
      <p>{textcut(description, 45)}</p>
      <div className="bookmark">
        <BookmarkIcon isBookmarked={bookmarked} onBookmarkToggle={onBookmarkToggle} />
      </div>
    </div>
  </div>
);

const chunkArray = (array: any[], size: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const StartupList: FC<StartupListProps> = ({ startups, setStartups, bookmarks, toggleBookmark }) => {
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchStartups = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/startups?offset=${offset}&limit=12`, {
        headers: {
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // 적절한 인증 헤더를 추가합니다.
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStartups((prevStartups) => [...prevStartups, ...(Array.isArray(data.startups) ? data.startups : [])]);
      } else {
        console.error('Failed to fetch startups:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching startups:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStartups();
  }, [offset]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      return;
    }
    setOffset((prevOffset) => prevOffset + 12);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const rows = chunkArray(startups, 4);

  return (
    <div className="startup-page">
      <h1>스타트업 리스트</h1>
      <div className="cards-container">
        {rows.map((row, rowIndex) => (
          <div className="card-row" key={rowIndex}>
            {row.map((startup) => (
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
        ))}
      </div>
    </div>
  );
};

export default StartupList;
