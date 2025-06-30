import React from 'react';
import {
  Clock,
  Users,
  Target,
  Rocket,
  Palette,
  Box,
  ChevronRight,
  FileText,
  Layers,
  Mic,
  FileVideo,
  Search
} from 'lucide-react';

interface Props {
  currentPath?: string;
  id?: string;
}

const links = [
  {
    header: 'Levels Framework',
    items: [
      {
        name: 'Levels and Titles',
        href: '/docs/levels/levels-titles',
        icon: Layers
      },
      {
        name: 'Level Competencies',
        href: '/docs/levels/level-competencies',
        icon: Target
      },
      {
        name: 'Job Descriptions',
        href: '/docs/levels/job-descriptions',
        icon: FileText
      },
      {
        name: 'Interview Panels',
        href: '/docs/levels/interview-panels',
        icon: Users
      },
      {
        name: 'Reviews',
        href: '/docs/levels/reviews',
        icon: FileText
      }
    ]
  },
  {
    header: 'LEADERSHIP DOCS',
    items: [
      {
        name: 'Manager',
        href: '/docs/manager',
        icon: Clock
      },
      {
        name: 'Design Team',
        href: '/docs/design-team',
        icon: Palette
      },
      {
        name: 'Product Team',
        href: '/docs/product-team',
        icon: Box
      }
    ]
  },
  {
    header: 'Resources',
    items: [
      {
        name: 'Recruiters',
        href: '/docs/recruiters',
        icon: Search
      }
    ]
  },
  {
    header: 'Videos',
    items: [
      {
        name: 'Interviews',
        href: '/docs/videos/interviews',
        icon: Mic
      },
      {
        name: 'Case Studies',
        href: '/docs/videos/case-studies',
        icon: FileVideo
      }
    ]
  }
];

const Sidebar = React.memo(function Sidebar({ currentPath = '/' }: Props) {
  return (
    <aside
      id="sidebar"
      className="fixed top-0 left-0 bottom-0 z-[60] w-[280px] lg:w-[250px] bg-[#f9f9f9] backdrop-blur-md overflow-y-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out border-r border-[#e5e5e5] lg:border-r lg:border-[#e5e5e5] shadow-[0px_0px_20px_rgba(0,0,0,0.1)] lg:shadow-none"
    >
      <nav className="p-4 h-full flex flex-col min-h-screen">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center mb-8 pt-4 pl-2">
          <a href="https://www.opendesigndocs.com/docs/levels/levels-titles" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
          </a>
        </div>
        
        {/* Desktop logo */}
        <div className="hidden lg:flex items-center gap-2 mb-8">
          <a href="https://www.opendesigndocs.com/docs/levels/levels-titles" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            <span className="text-[15px] font-medium text-gray-900 leading-none">Open Design Docs</span>
          </a>
        </div>
        <div className="flex-1">
          {links.map(section => (
            <div className="mb-8" key={section.header}>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                {section.header}
              </h2>
              <ul className="space-y-[2px]">
                {section.items.map(item => {
                  const isActive = currentPath?.startsWith(item.href) ?? false;
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className={`flex items-center gap-2 px-2 py-2 text-[14px] rounded-lg transition-colors duration-150 ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-600 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                        <span>{item.name}</span>
                        {isActive && <ChevronRight className="w-4 h-4 ml-auto text-indigo-600" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        
        {/* User Profile Section - Mobile only - Removed to prevent Clerk context issues */}
      </nav>
    </aside>
  );
});

export default Sidebar;