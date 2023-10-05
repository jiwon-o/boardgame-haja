import { useState, useEffect } from "react";

function useColumns() {
  const [columns, setColumns] = useState<number>(() => {
    const width = window.innerWidth;
    if (width >= 1600) {
      return 6;
    } else if (width >= 1400) {
      return 5;
    } else if (width >= 1200) {
      return 4;
    } else if (width >= 880) {
      return 3;
    } else if (width >= 512) {
      return 2;
    } else {
      return 1;
    }
  });

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width >= 1600) {
        setColumns(6);
      } else if (width >= 1400) {
        setColumns(5);
      } else if (width >= 1200) {
        setColumns(4);
      } else if (width >= 880) {
        setColumns(3);
      } else if (width >= 512) {
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
