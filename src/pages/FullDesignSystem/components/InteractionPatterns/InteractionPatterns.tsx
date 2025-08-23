import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { MLText, MLHeading } from '../../../../components/ML';

interface InteractionPatternsProps {
  themeMode: 'light' | 'dark' | 'minimal' | 'maximal';
  isAnimationEnabled: boolean;
}

export const InteractionPatterns: React.FC<InteractionPatternsProps> = ({ themeMode, isAnimationEnabled }) => {
  const [activePattern, setActivePattern] = useState<string>('navigation');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editableText, setEditableText] = useState('Click to edit this text');
  
  const dragControls = useDragControls();
  const dragRef = useRef<HTMLDivElement>(null);

  const patterns = [
    { key: 'navigation', label: 'Navigation', icon: '🧭', description: 'Menus, breadcrumbs, tabs' },
    { key: 'search', label: 'Search & Filter', icon: '🔍', description: 'Search, filter, sort, pagination' },
    { key: 'selection', label: 'Selection', icon: '✅', description: 'Multi-select, checkboxes, bulk actions' },
    { key: 'drag', label: 'Drag & Drop', icon: '🔄', description: 'Reordering, file uploads' },
    { key: 'editing', label: 'Inline Editing', icon: '✏️', description: 'Click-to-edit, auto-save' },
    { key: 'collaboration', label: 'Collaboration', icon: '👥', description: 'Real-time indicators, cursors' }
  ];

  const sampleData = [
    { id: '1', name: 'Project Alpha', type: 'Web App', status: 'Active', date: '2024-01-15' },
    { id: '2', name: 'Design System', type: 'UI Kit', status: 'In Progress', date: '2024-01-20' },
    { id: '3', name: 'Mobile App', type: 'iOS App', status: 'Completed', date: '2024-01-10' },
    { id: '4', name: 'Brand Identity', type: 'Branding', status: 'Active', date: '2024-01-25' },
    { id: '5', name: 'Marketing Site', type: 'Website', status: 'Completed', date: '2024-01-05' },
    { id: '6', name: 'Admin Dashboard', type: 'Web App', status: 'In Progress', date: '2024-01-18' }
  ];

  const filteredData = sampleData
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterBy === 'all' || item.type === filterBy)
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      return 0;
    });

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on items:`, selectedItems);
    setSelectedItems([]);
  };

  const renderPatternDemo = () => {
    switch (activePattern) {
      case 'navigation':
        return (
          <div className="fds-pattern-demo">
            <div className="fds-demo-section">
              <h4>Breadcrumb Navigation</h4>
              <nav className="fds-breadcrumb">
                <motion.a 
                  href="#" 
                  whileHover={{ color: 'var(--lss-accent)' }}
                  onClick={(e) => e.preventDefault()}
                >
                  Home
                </motion.a>
                <span className="fds-breadcrumb-separator">→</span>
                <motion.a 
                  href="#" 
                  whileHover={{ color: 'var(--lss-accent)' }}
                  onClick={(e) => e.preventDefault()}
                >
                  Projects
                </motion.a>
                <span className="fds-breadcrumb-separator">→</span>
                <span className="fds-breadcrumb-current">Design System</span>
              </nav>
            </div>

            <div className="fds-demo-section">
              <h4>Tab Navigation</h4>
              <div className="fds-tab-container">
                {['Overview', 'Details', 'Settings', 'History'].map((tab, index) => (
                  <motion.button
                    key={tab}
                    className={`fds-tab ${index === 0 ? 'active' : ''}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab}
                    {index === 0 && (
                      <motion.div
                        className="fds-tab-indicator"
                        layoutId="tab-indicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="fds-demo-section">
              <h4>Sidebar Navigation</h4>
              <div className="fds-sidebar-demo">
                {[
                  { icon: '📊', label: 'Dashboard' },
                  { icon: '📁', label: 'Projects', active: true },
                  { icon: '👥', label: 'Team' },
                  { icon: '⚙️', label: 'Settings' }
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    className={`fds-sidebar-item ${item.active ? 'active' : ''}`}
                    whileHover={{ x: 4, backgroundColor: 'rgba(255, 107, 74, 0.05)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="fds-sidebar-icon">{item.icon}</span>
                    <span className="fds-sidebar-label">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'search':
        return (
          <div className="fds-pattern-demo">
            <div className="fds-demo-section">
              <h4>Search & Filter Interface</h4>
              <div className="fds-search-controls">
                <div className="fds-search-input-container">
                  <input
                    type="text"
                    className="fds-search-input"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="fds-search-icon">🔍</span>
                </div>
                
                <select 
                  className="fds-filter-select"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="Web App">Web App</option>
                  <option value="UI Kit">UI Kit</option>
                  <option value="iOS App">iOS App</option>
                  <option value="Branding">Branding</option>
                  <option value="Website">Website</option>
                </select>

                <select 
                  className="fds-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Sort by Name</option>
                  <option value="date">Sort by Date</option>
                </select>
              </div>

              <div className="fds-results-container">
                <AnimatePresence>
                  {paginatedData.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="fds-result-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="fds-result-info">
                        <h5>{item.name}</h5>
                        <span className="fds-result-type">{item.type}</span>
                      </div>
                      <div className="fds-result-meta">
                        <span className={`fds-status ${item.status.toLowerCase().replace(' ', '-')}`}>
                          {item.status}
                        </span>
                        <span className="fds-result-date">{item.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="fds-pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    className={`fds-page-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'selection':
        return (
          <div className="fds-pattern-demo">
            <div className="fds-demo-section">
              <h4>Multi-Select Interface</h4>
              <div className="fds-bulk-actions">
                <AnimatePresence>
                  {selectedItems.length > 0 && (
                    <motion.div
                      className="fds-bulk-bar"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <span className="fds-selected-count">
                        {selectedItems.length} items selected
                      </span>
                      <div className="fds-bulk-buttons">
                        <button 
                          className="fds-bulk-btn"
                          onClick={() => handleBulkAction('archive')}
                        >
                          Archive
                        </button>
                        <button 
                          className="fds-bulk-btn"
                          onClick={() => handleBulkAction('delete')}
                        >
                          Delete
                        </button>
                        <button 
                          className="fds-bulk-btn"
                          onClick={() => setSelectedItems([])}
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="fds-selectable-list">
                {sampleData.slice(0, 4).map((item) => (
                  <motion.div
                    key={item.id}
                    className={`fds-selectable-item ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                    onClick={() => handleItemSelect(item.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <motion.div
                      className="fds-checkbox"
                      animate={{
                        backgroundColor: selectedItems.includes(item.id) ? 'var(--lss-accent)' : 'transparent',
                        borderColor: selectedItems.includes(item.id) ? 'var(--lss-accent)' : 'rgba(255, 107, 74, 0.3)'
                      }}
                    >
                      {selectedItems.includes(item.id) && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="fds-checkmark"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.div>
                    <div className="fds-item-content">
                      <h5>{item.name}</h5>
                      <span className="fds-item-type">{item.type}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'drag':
        return (
          <div className="fds-pattern-demo">
            <div className="fds-demo-section">
              <h4>Drag & Drop Reordering</h4>
              <div className="fds-drag-container">
                {[
                  { id: '1', title: 'Research Phase', status: 'Completed' },
                  { id: '2', title: 'Design Phase', status: 'In Progress' },
                  { id: '3', title: 'Development Phase', status: 'Pending' },
                  { id: '4', title: 'Testing Phase', status: 'Pending' }
                ].map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="fds-draggable-item"
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0.1}
                    whileDrag={{ 
                      scale: 1.05, 
                      rotate: 2,
                      boxShadow: '0 10px 30px rgba(255, 107, 74, 0.3)',
                      zIndex: 10
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="fds-drag-handle">⋮⋮</div>
                    <div className="fds-drag-content">
                      <h5>{item.title}</h5>
                      <span className={`fds-drag-status ${item.status.toLowerCase().replace(' ', '-')}`}>
                        {item.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="fds-demo-section">
              <h4>File Drop Zone</h4>
              <motion.div
                className="fds-drop-zone"
                whileHover={{ 
                  backgroundColor: 'rgba(255, 107, 74, 0.05)',
                  borderColor: 'var(--lss-accent)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="fds-drop-icon">📁</div>
                <h5>Drop files here</h5>
                <p>Or click to browse</p>
              </motion.div>
            </div>
          </div>
        );

      case 'editing':
        return (
          <div className="fds-pattern-demo">
            <div className="fds-demo-section">
              <h4>Inline Editing</h4>
              <div className="fds-editable-content">
                <motion.h3
                  className={`fds-editable-title ${isEditing === 'title' ? 'editing' : ''}`}
                  onClick={() => setIsEditing('title')}
                  whileHover={{ backgroundColor: 'rgba(255, 107, 74, 0.05)' }}
                >
                  {isEditing === 'title' ? (
                    <input
                      type="text"
                      defaultValue="Project Title"
                      autoFocus
                      onBlur={() => setIsEditing(null)}
                      onKeyDown={(e) => e.key === 'Enter' && setIsEditing(null)}
                      className="fds-inline-input"
                    />
                  ) : (
                    'Project Title'
                  )}
                  <span className="fds-edit-hint">✏️</span>
                </motion.h3>

                <motion.p
                  className={`fds-editable-text ${isEditing === 'description' ? 'editing' : ''}`}
                  onClick={() => setIsEditing('description')}
                  whileHover={{ backgroundColor: 'rgba(255, 107, 74, 0.05)' }}
                >
                  {isEditing === 'description' ? (
                    <textarea
                      defaultValue="This is an editable description. Click to modify the content."
                      autoFocus
                      onBlur={() => setIsEditing(null)}
                      className="fds-inline-textarea"
                    />
                  ) : (
                    'This is an editable description. Click to modify the content.'
                  )}
                  <span className="fds-edit-hint">✏️</span>
                </motion.p>
              </div>

              <div className="fds-quick-edit-toolbar">
                <h5>Quick Actions</h5>
                <div className="fds-toolbar-buttons">
                  {['Bold', 'Italic', 'Link', 'List'].map((action) => (
                    <motion.button
                      key={action}
                      className="fds-toolbar-btn"
                      whileHover={{ scale: 1.05, backgroundColor: 'var(--lss-accent)', color: 'white' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'collaboration':
        return (
          <div className="fds-pattern-demo">
            <div className="fds-demo-section">
              <h4>Real-time Collaboration</h4>
              <div className="fds-collaboration-container">
                <div className="fds-active-users">
                  <h5>Active Users</h5>
                  <div className="fds-user-avatars">
                    {[
                      { name: 'Alex', color: '#FF6B4A', active: true },
                      { name: 'Jordan', color: '#B8A4E3', active: true },
                      { name: 'Sam', color: '#FFB84D', active: false }
                    ].map((user) => (
                      <motion.div
                        key={user.name}
                        className={`fds-user-avatar ${user.active ? 'active' : ''}`}
                        style={{ backgroundColor: user.color }}
                        whileHover={{ scale: 1.1 }}
                        animate={user.active ? { 
                          boxShadow: [`0 0 0 0 ${user.color}40`, `0 0 0 8px ${user.color}00`] 
                        } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {user.name.charAt(0)}
                        {user.active && (
                          <div className="fds-user-status" style={{ backgroundColor: user.color }} />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="fds-live-cursors-demo">
                  <h5>Live Cursors</h5>
                  <div className="fds-cursor-playground">
                    <motion.div
                      className="fds-live-cursor alex"
                      animate={{
                        x: [50, 150, 100, 200],
                        y: [30, 80, 120, 60]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="fds-cursor-pointer" />
                      <div className="fds-cursor-label">Alex is editing</div>
                    </motion.div>

                    <motion.div
                      className="fds-live-cursor jordan"
                      animate={{
                        x: [200, 80, 160, 120],
                        y: [100, 40, 90, 140]
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    >
                      <div className="fds-cursor-pointer" />
                      <div className="fds-cursor-label">Jordan is reviewing</div>
                    </motion.div>
                  </div>
                </div>

                <div className="fds-activity-feed">
                  <h5>Recent Activity</h5>
                  <div className="fds-activity-list">
                    <AnimatePresence>
                      {[
                        { user: 'Alex', action: 'edited the title', time: '2s ago', color: '#FF6B4A' },
                        { user: 'Jordan', action: 'added a comment', time: '5s ago', color: '#B8A4E3' },
                        { user: 'Alex', action: 'uploaded an image', time: '12s ago', color: '#FF6B4A' }
                      ].map((activity, index) => (
                        <motion.div
                          key={index}
                          className="fds-activity-item"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div 
                            className="fds-activity-avatar" 
                            style={{ backgroundColor: activity.color }}
                          >
                            {activity.user.charAt(0)}
                          </div>
                          <div className="fds-activity-content">
                            <span className="fds-activity-text">
                              <strong>{activity.user}</strong> {activity.action}
                            </span>
                            <span className="fds-activity-time">{activity.time}</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fds-interaction-patterns">
      <style>{`
        .fds-interaction-patterns {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .fds-patterns-nav {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .fds-pattern-nav-item {
          background: var(--lss-surface);
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all var(--lss-duration-normal) var(--lss-easing);
          text-align: left;
        }

        .fds-pattern-nav-item:hover {
          background: rgba(255, 107, 74, 0.05);
          border-color: rgba(255, 107, 74, 0.2);
          transform: translateY(-2px);
        }

        .fds-pattern-nav-item.active {
          border-color: var(--lss-accent);
          background: rgba(255, 107, 74, 0.08);
          transform: translateY(-4px);
        }

        .fds-pattern-demo {
          background: var(--lss-surface);
          border-radius: 20px;
          padding: 3rem;
          border: 1px solid rgba(255, 107, 74, 0.1);
        }

        .fds-demo-section {
          margin-bottom: 3rem;
        }

        .fds-demo-section:last-child {
          margin-bottom: 0;
        }

        .fds-demo-section h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 1.5rem;
          font-family: var(--lss-font-display);
        }

        .fds-demo-section h5 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 1rem;
        }

        /* Navigation Styles */
        .fds-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(255, 107, 74, 0.05);
          border-radius: 12px;
        }

        .fds-breadcrumb a {
          color: var(--lss-text-secondary);
          text-decoration: none;
          transition: color var(--lss-duration-fast) var(--lss-easing);
        }

        .fds-breadcrumb-separator {
          color: var(--lss-text-secondary);
          opacity: 0.5;
        }

        .fds-breadcrumb-current {
          color: var(--lss-text-primary);
          font-weight: 600;
        }

        .fds-tab-container {
          display: flex;
          gap: 0.5rem;
          border-bottom: 2px solid rgba(255, 107, 74, 0.1);
          margin-bottom: 1rem;
        }

        .fds-tab {
          background: none;
          border: none;
          padding: 1rem 1.5rem;
          color: var(--lss-text-secondary);
          font-weight: 500;
          cursor: pointer;
          position: relative;
          transition: color var(--lss-duration-fast) var(--lss-easing);
        }

        .fds-tab.active {
          color: var(--lss-accent);
        }

        .fds-tab-indicator {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--lss-accent);
        }

        .fds-sidebar-demo {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-width: 250px;
        }

        .fds-sidebar-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all var(--lss-duration-fast) var(--lss-easing);
        }

        .fds-sidebar-item.active {
          background: rgba(255, 107, 74, 0.1);
          color: var(--lss-accent);
        }

        .fds-sidebar-icon {
          font-size: 1.125rem;
        }

        .fds-sidebar-label {
          font-weight: 500;
        }

        /* Search & Filter Styles */
        .fds-search-controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .fds-search-input-container {
          position: relative;
          flex: 1;
          min-width: 250px;
        }

        .fds-search-input {
          width: 100%;
          padding: 0.75rem 1rem;
          padding-right: 3rem;
          border: 2px solid rgba(255, 107, 74, 0.2);
          border-radius: 12px;
          background: var(--lss-background);
          color: var(--lss-text-primary);
          font-size: 0.875rem;
          transition: border-color var(--lss-duration-fast) var(--lss-easing);
        }

        .fds-search-input:focus {
          outline: none;
          border-color: var(--lss-accent);
        }

        .fds-search-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--lss-text-secondary);
        }

        .fds-filter-select,
        .fds-sort-select {
          padding: 0.75rem;
          border: 2px solid rgba(255, 107, 74, 0.2);
          border-radius: 12px;
          background: var(--lss-background);
          color: var(--lss-text-primary);
          cursor: pointer;
        }

        .fds-results-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .fds-result-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: rgba(255, 107, 74, 0.03);
          border: 1px solid rgba(255, 107, 74, 0.1);
          border-radius: 12px;
          cursor: pointer;
        }

        .fds-result-info h5 {
          margin: 0 0 0.25rem 0;
          color: var(--lss-text-primary);
        }

        .fds-result-type {
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
        }

        .fds-result-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .fds-status {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .fds-status.active {
          background: rgba(46, 204, 113, 0.2);
          color: #27ae60;
        }

        .fds-status.in-progress {
          background: rgba(241, 196, 15, 0.2);
          color: #f39c12;
        }

        .fds-status.completed {
          background: rgba(52, 152, 219, 0.2);
          color: #3498db;
        }

        .fds-result-date {
          font-size: 0.75rem;
          color: var(--lss-text-secondary);
        }

        .fds-pagination {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }

        .fds-page-btn {
          width: 40px;
          height: 40px;
          border: 2px solid rgba(255, 107, 74, 0.2);
          border-radius: 8px;
          background: var(--lss-background);
          color: var(--lss-text-primary);
          cursor: pointer;
          font-weight: 500;
        }

        .fds-page-btn.active {
          background: var(--lss-accent);
          color: white;
          border-color: var(--lss-accent);
        }

        /* Selection Styles */
        .fds-bulk-bar {
          background: var(--lss-accent);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .fds-bulk-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .fds-bulk-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          color: white;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .fds-selectable-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .fds-selectable-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 2px solid rgba(255, 107, 74, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all var(--lss-duration-fast) var(--lss-easing);
        }

        .fds-selectable-item.selected {
          border-color: var(--lss-accent);
          background: rgba(255, 107, 74, 0.05);
        }

        .fds-checkbox {
          width: 20px;
          height: 20px;
          border: 2px solid;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--lss-duration-fast) var(--lss-easing);
        }

        .fds-checkmark {
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* Drag & Drop Styles */
        .fds-drag-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .fds-draggable-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--lss-surface);
          border: 2px solid rgba(255, 107, 74, 0.1);
          border-radius: 12px;
          cursor: grab;
        }

        .fds-draggable-item:active {
          cursor: grabbing;
        }

        .fds-drag-handle {
          color: var(--lss-text-secondary);
          font-size: 1.25rem;
          cursor: grab;
        }

        .fds-drag-content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .fds-drag-content h5 {
          margin: 0;
          color: var(--lss-text-primary);
        }

        .fds-drag-status {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .fds-drag-status.completed {
          background: rgba(46, 204, 113, 0.2);
          color: #27ae60;
        }

        .fds-drag-status.in-progress {
          background: rgba(241, 196, 15, 0.2);
          color: #f39c12;
        }

        .fds-drag-status.pending {
          background: rgba(149, 165, 166, 0.2);
          color: #7f8c8d;
        }

        .fds-drop-zone {
          border: 2px dashed rgba(255, 107, 74, 0.3);
          border-radius: 12px;
          padding: 3rem;
          text-align: center;
          cursor: pointer;
          transition: all var(--lss-duration-fast) var(--lss-easing);
        }

        .fds-drop-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .fds-drop-zone h5 {
          margin: 0 0 0.5rem 0;
          color: var(--lss-text-primary);
        }

        .fds-drop-zone p {
          margin: 0;
          color: var(--lss-text-secondary);
        }

        /* Inline Editing Styles */
        .fds-editable-content {
          margin-bottom: 2rem;
        }

        .fds-editable-title,
        .fds-editable-text {
          position: relative;
          padding: 0.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color var(--lss-duration-fast) var(--lss-easing);
        }

        .fds-editable-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--lss-text-primary);
        }

        .fds-editable-text {
          color: var(--lss-text-secondary);
          line-height: 1.6;
        }

        .fds-edit-hint {
          opacity: 0;
          margin-left: 0.5rem;
          transition: opacity var(--lss-duration-fast) var(--lss-easing);
        }

        .fds-editable-title:hover .fds-edit-hint,
        .fds-editable-text:hover .fds-edit-hint {
          opacity: 0.6;
        }

        .fds-inline-input,
        .fds-inline-textarea {
          width: 100%;
          background: transparent;
          border: 2px solid var(--lss-accent);
          border-radius: 6px;
          padding: 0.5rem;
          color: var(--lss-text-primary);
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
        }

        .fds-inline-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .fds-quick-edit-toolbar {
          background: rgba(255, 107, 74, 0.05);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .fds-toolbar-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .fds-toolbar-btn {
          background: var(--lss-surface);
          border: 2px solid rgba(255, 107, 74, 0.2);
          border-radius: 8px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 0.875rem;
          color: var(--lss-text-primary);
          transition: all var(--lss-duration-fast) var(--lss-easing);
        }

        /* Collaboration Styles */
        .fds-collaboration-container {
          display: grid;
          gap: 2rem;
        }

        .fds-user-avatars {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .fds-user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
          position: relative;
          cursor: pointer;
        }

        .fds-user-status {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          position: absolute;
          bottom: -2px;
          right: -2px;
          border: 2px solid var(--lss-background);
        }

        .fds-cursor-playground {
          position: relative;
          height: 200px;
          background: rgba(255, 107, 74, 0.03);
          border-radius: 12px;
          margin-top: 1rem;
          overflow: hidden;
        }

        .fds-live-cursor {
          position: absolute;
          pointer-events: none;
        }

        .fds-cursor-pointer {
          width: 0;
          height: 0;
          border-left: 8px solid;
          border-right: 8px solid transparent;
          border-bottom: 12px solid;
        }

        .fds-live-cursor.alex .fds-cursor-pointer {
          border-left-color: #FF6B4A;
          border-bottom-color: #FF6B4A;
        }

        .fds-live-cursor.jordan .fds-cursor-pointer {
          border-left-color: #B8A4E3;
          border-bottom-color: #B8A4E3;
        }

        .fds-cursor-label {
          background: var(--lss-text-primary);
          color: var(--lss-background);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          white-space: nowrap;
          margin-top: 0.5rem;
        }

        .fds-activity-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .fds-activity-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .fds-activity-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.75rem;
        }

        .fds-activity-content {
          flex: 1;
        }

        .fds-activity-text {
          display: block;
          color: var(--lss-text-primary);
          font-size: 0.875rem;
        }

        .fds-activity-time {
          color: var(--lss-text-secondary);
          font-size: 0.75rem;
        }

        @media (max-width: 768px) {
          .fds-patterns-nav {
            grid-template-columns: 1fr;
          }
          
          .fds-pattern-demo {
            padding: 2rem;
          }
          
          .fds-search-controls {
            flex-direction: column;
          }
          
          .fds-toolbar-buttons {
            justify-content: center;
          }
          
          .fds-collaboration-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="fds-section-header">
        <MLHeading level="2">Interaction Patterns</MLHeading>
        <MLText>
          Advanced user interface patterns for navigation, data manipulation, and collaborative experiences
        </MLText>
      </div>

      <nav className="fds-patterns-nav">
        {patterns.map((pattern) => (
          <button
            key={pattern.key}
            className={`fds-pattern-nav-item ${activePattern === pattern.key ? 'active' : ''}`}
            onClick={() => setActivePattern(pattern.key)}
          >
            <span className="fds-nav-item-icon">{pattern.icon}</span>
            <span className="fds-nav-item-label">{pattern.label}</span>
            <span className="fds-nav-item-description">{pattern.description}</span>
          </button>
        ))}
      </nav>

      <motion.div
        key={activePattern}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {renderPatternDemo()}
      </motion.div>
    </div>
  );
};