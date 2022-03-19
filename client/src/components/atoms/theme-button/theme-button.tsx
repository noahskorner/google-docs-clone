import { SunIcon, MoonIcon } from '@heroicons/react/outline';
import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/theme-context';
import ThemeEnum from '../../../enums/theme-enum';
import IconButton from '../icon-button/icon-button';

const ThemeButton = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <IconButton
      onClick={() =>
        themeContext?.setTheme(
          themeContext?.theme === ThemeEnum.LIGHT
            ? ThemeEnum.DARK
            : ThemeEnum.LIGHT
        )
      }
      icon={
        themeContext?.theme === ThemeEnum.LIGHT ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )
      }
    />
  );
};

export default ThemeButton;
