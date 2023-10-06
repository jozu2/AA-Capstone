import { useState } from "react";

export const useTabBarVisibility = () => {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  const showTabBar = () => {
    setIsTabBarVisible(true);
  };

  const hideTabBar = () => {
    setIsTabBarVisible(false);
  };

  return { isTabBarVisible, showTabBar, hideTabBar };
};
