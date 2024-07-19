// import React, { useState } from 'react';
// import './BookmarkIcon.css'; // CSS 파일을 사용하여 스타일링

// const BookmarkIcon: React.FC = () => {
//   const [bookMarkIcon, setbookMarkIcon] = useState(false);

//   type BookmarkIconProps = {
//     isBookmarked: boolean;
//     onBookmarkToggle: () => void;
//   };

//   return (
//     <div onClick={() => setbookMarkIcon(!bookMarkIcon)} className="bookmark-icon">
//       {bookMarkIcon ? (
//         <div className="bookmark-checked"></div>
//       ) : (
//         <div className="bookmark-unchecked"></div>
//       )}
//     </div>
//   );
// };

// export default BookmarkIcon;

import React from 'react';
import './BookmarkIcon.css'; // CSS 파일을 사용하여 스타일링

type BookmarkIconProps = {
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
};

const BookmarkIcon: React.FC<BookmarkIconProps> = ({ isBookmarked, onBookmarkToggle }) => {
  return (
    <div onClick={onBookmarkToggle} className="bookmark-icon">
      {isBookmarked ? (
        <div className="bookmark-checked"></div>
      ) : (
        <div className="bookmark-unchecked"></div>
      )}
    </div>
  );
};

export default BookmarkIcon;
