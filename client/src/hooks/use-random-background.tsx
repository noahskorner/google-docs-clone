import { useEffect, useState } from 'react';
import { colors } from '../utils/constants';

const useRandomBackground = () => {
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  useEffect(() => {
    setBackgroundColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  return {
    backgroundColor,
  };
};

export default useRandomBackground;
