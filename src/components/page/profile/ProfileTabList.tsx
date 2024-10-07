import React from 'react';

import Tab from '@/components/page/profile/Tab';
import {
  PROFILE_CONTENT_TAB_LIST,
  PROFILE_CONTENT_LABEL_LIST,
  ProfileContentTab
} from '@/libs/constants/profileTabList';

interface ProfileTabListProps {
  activePage: ProfileContentTab;
  onClickTab: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ProfileTabList({ activePage, onClickTab }: ProfileTabListProps) {
  return (
    <ul className="flex justify-around md:justify-start md:gap-10">
      {PROFILE_CONTENT_TAB_LIST.map((tab) => (
        <li key={tab}>
          <button type="button" id={tab} onClick={onClickTab}>
            <Tab isActive={tab === activePage}>{PROFILE_CONTENT_LABEL_LIST[tab]}</Tab>
          </button>
        </li>
      ))}
    </ul>
  );
}
