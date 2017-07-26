import React from 'react';

import md5 from 'md5';

export const Avatar = ({ user, size = 36 }) =>
  <img
    alt={user.displayName || user.username}
    src={`https://www.gravatar.com/avatar/${md5(user.email || user.username)}?s=${size}&d=mm`}
    className={`gravatarimg${size}`}
    height={`${size}px`}
    width={`${size}px`}
  />;
