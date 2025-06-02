import React from "react";
import ClerkProvider from "./ClerkProvider";
import ClerkAuthOverlay from "./ClerkAuthOverlay";
import Sidebar from "./Sidebar";
import UserProfileButton from "./UserProfileButton";
import AutoAuthGuard from "./AutoAuthGuard";

interface ClerkReactIslandProps extends React.PropsWithChildren<{}> {
  currentPath: string;
  showSidebar?: boolean;
}

export default function ClerkReactIsland({ children, currentPath, showSidebar = true }: ClerkReactIslandProps) {
  console.log('ClerkReactIsland rendering on path:', currentPath);
  const isHomepage = currentPath === '/';
  
  console.log('ClerkReactIsland conditions:', {
    isHomepage,
    showSidebar,
    willShowUserProfileButton: !isHomepage,
    willShowSidebar: showSidebar && !isHomepage
  });
  
  return (
    <ClerkProvider>
      {!isHomepage && <AutoAuthGuard currentPath={currentPath} />}
      {!isHomepage && (
        <div className="hidden lg:block">
          <UserProfileButton />
        </div>
      )}
      {showSidebar && !isHomepage && <Sidebar currentPath={currentPath} />}
      {children}
      <ClerkAuthOverlay allowClose={true} />
    </ClerkProvider>
  );
} 