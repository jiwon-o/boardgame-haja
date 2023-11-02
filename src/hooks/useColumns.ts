import { useState, useEffect } from "react";

function useColumns() {
  const [columns, setColumns] = useState<number>(() => {
    const width = window.innerWidth;
    if (width >= 1260) {
      return 4;
    } else if (width >= 960) {
      return 3;
    } else if (width >= 660) {
      return 2;
    } else {
      return 1;
    }
  });

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width >= 1260) {
        setColumns(4);
      } else if (width >= 960) {
        setColumns(3);
      } else if (width >= 660) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return columns;
}

export default useColumns;
