import React, { useEffect } from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';

export default function UserProfileSidebar() {
  const { user, isSignedIn } = useUser();
  useEffect(() => {
    console.log("UserProfileSidebar: isSignedIn =", isSignedIn, "user =", user);
  }, [isSignedIn, user]);
  if (!isSignedIn) return null;
  return (
    <div style={{
      width: '100%',
      background: '#f9f9f9',
      padding: '4px 8px 12px 8px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }}>
      <UserButton appearance={{ elements: { avatarBox: { width: 28, height: 28 } } }} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
        <div style={{ fontWeight: 500, fontSize: 14, color: '#4b5563', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {user.fullName}
        </div>
      </div>
    </div>
  );
} 