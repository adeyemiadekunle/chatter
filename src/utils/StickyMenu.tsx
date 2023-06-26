import React, { useState, useEffect, CSSProperties } from 'react';
import { Flex } from '@chakra-ui/react';

interface StickyMenuProps {
    children: React.ReactNode;
}


const StickyMenu = ({children}: StickyMenuProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  const menuStyles:CSSProperties = {
    position: 'fixed',
    bottom: '10px',
    width: '100%',
    left: 0,
    right: 0,
    zIndex: 9999,
  };
  

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition < lastScrollPosition) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPosition]);

  return (
    <Flex style={isSticky ? menuStyles : undefined} justifyContent='center'>
        {children}
    </Flex>
  );
};

export default StickyMenu;






