import { useEffect, useState } from "react";

function useScroll(initialCount = 50) {
  const [dataCount, setDataCount] = useState(initialCount);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setDataCount((prevDataCount) => prevDataCount + initialCount);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return dataCount;
}

export default useScroll;
