import React from 'react';
import { Menu } from '@headlessui/react';

interface MenuButtonProps {
  children: React.ReactNode;
}

export function MenuButton({ children }: MenuButtonProps) {
  return (
    <Menu.Button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
      {children}
    </Menu.Button>
  );
}

interface MenuItemsProps {
  children: React.ReactNode;
}

export function MenuItems({ children }: MenuItemsProps) {
  return (
    <Menu.Items className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
      <div className="py-1">
        {children}
      </div>
    </Menu.Items>
  );
}

interface MenuItemProps {
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function MenuItem({ onClick, icon, children }: MenuItemProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={`${
            active ? 'bg-gray-100' : ''
          } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
        >
          <span className="w-4 h-4 mr-2">{icon}</span>
          {children}
        </button>
      )}
    </Menu.Item>
  );
}