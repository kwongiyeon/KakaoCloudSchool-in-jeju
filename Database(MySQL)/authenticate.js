const authenticate = (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ message: '로그인 해주세요.' });
    }
    next(); // 로그인되어 있으면 다음 미들웨어나 라우트 핸들러로 이동
  };
  
  export default authenticate;