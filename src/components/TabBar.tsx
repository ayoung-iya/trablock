// 추후 버튼 들어오면 버튼 컴포넌트로 교체 예정

// page에서 렌더링할 컴포넌트를 관리할 state를 선언해주세요 ex) const [ renderedComponent, setRenderedComponent ] = useSTate;
// page에서 handleTabBarClick 함수를 관리해주세요.
// const handleTabBarClick = (tabName) => {
// setRenderComponent(tabName);}

'use client';

import { useState } from 'react';

import classNames from 'classnames';
import '@/styles/custom.css';

/**
 * Props for the TabBar component.
 *
 * @typedef {Object} TabBarProps
 * @property {string[]} tabBarList - List of tab names. ex) ['여행 후기', '여행 계획']
 * @property {function(string): void} handleTabBarClick - Function to handle tab click events. ex) const handleTabBarClick = (tabName) => { setRenderComponent(tabName);}
 * @property {'S' | 'M' | 'L' | 'vertical_M' | 'vertical_L'} size - Size of the tab bar. 세로 정렬일 경우 vertical 사용
 */

/**
 * TabBar component renders a list of tabs.
 *
 * @param {TabBarProps} props - The props for the TabBar component.
 * @returns {JSX.Element} The rendered TabBar component.
 */

interface TabBarProps {
  tabBarList: string[];
  handleTabBarClick: (item: string) => void;
  size: 'S' | 'M' | 'L' | 'vertical_M' | 'vertical_L';
}

export default function TabBar({ tabBarList, handleTabBarClick, size }: TabBarProps) {
  const [clickedTab, setClickedTab] = useState<string>(tabBarList[0]);

  const tabBarCss = {
    L: {
      ulClassName: 'tab-bar-ul',
      liClassName: 'tab-bar-li',
      hrClassName: 'tab-bar-hr'
    },
    M: {
      ulClassName: 'tab-bar-ul',
      liClassName: 'tab-bar-li',
      hrClassName: 'tab-bar-hr'
    },
    S: {
      ulClassName: 'justify-around flex gap-16',
      liClassName: 'flex flex-col gap-3 w-max',
      hrClassName: 'tab-bar-hr'
    },
    vertical_M: {
      ulClassName: 'flex flex-col gap-2',
      liClassName: 'tab-bar-li-vertical-M',
      hrClassName: 'tab-bar-hr-vertical'
    },
    vertical_L: {
      ulClassName: 'flex flex-col gap-3',
      liClassName: 'tab-bar-li-vertical-L',
      hrClassName: 'tab-bar-hr-vertical'
    }
  };

  return (
    <nav>
      <ul className={tabBarCss[size].ulClassName}>
        {tabBarList.map((item) => {
          const className = classNames('tab-bar-button', {
            'tab-bar-button-active': clickedTab === item
          });

          const hrClassName = classNames(
            {
              'tab-bar-hr-active': clickedTab === item
            },
            tabBarCss[size].hrClassName
          );

          return (
            <li className={tabBarCss[size].liClassName}>
              <button
                className={className}
                type="button"
                onClick={() => {
                  handleTabBarClick(item);
                  setClickedTab(item);
                }}
              >
                {item}
              </button>
              <hr className={hrClassName} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
