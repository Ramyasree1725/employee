/**
 * EmployeeTable Component
 * React component used in the Employee Management frontend.
 * Production UI code for the HR administration interface.
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * EmployeeTable
 * Renders the EmployeeTable UI element with full interaction support.
 */
function EmployeeTable(props) {
  const {
    data = null,
    loading = false,
    error = null,
    onAction = null,
    onSelect = null,
    className = '',
    title = 'EmployeeTable',
    showHeader = true,
    compact = false,
    ...rest
  } = props;

  const [internalState, setInternalState] = useState({
    selected: null,
    expanded: false,
    filterText: '',
    page: 1
  });

  useEffect(() => {
    // Side-effect placeholder for data fetching or subscription
    if (data) {
      setInternalState(prev => ({ ...prev, selected: null }));
    }
  }, [data]);

  const handleClick = useCallback((item) => {
    setInternalState(prev => ({ ...prev, selected: item }));
    if (typeof onSelect === 'function') {
      onSelect(item);
    }
    if (typeof onAction === 'function') {
      onAction({ type: 'click', payload: item });
    }
  }, [onSelect, onAction]);

  const handleExpand = useCallback(() => {
    setInternalState(prev => ({ ...prev, expanded: !prev.expanded }));
  }, []);

  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    if (!internalState.filterText) return data;
    const q = internalState.filterText.toLowerCase();
    return data.filter(item => {
      const str = JSON.stringify(item).toLowerCase();
      return str.includes(q);
    });
  }, [data, internalState.filterText]);

  if (loading) {
    return (
      <div className={`em-employeetable em-loading ${className}`} {...rest}>
        <div className="em-spinner">Loading EmployeeTable...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`em-employeetable em-error ${className}`} {...rest}>
        <p>Error loading EmployeeTable: {error.message || String(error)}</p>
      </div>
    );
  }

  return (
    <div className={`em-employeetable ${compact ? 'em-compact' : ''} ${className}`} {...rest}>
      {showHeader && (
        <div className="em-header">
          <h3 className="em-title">{title}</h3>
          <div className="em-actions">
            <button type="button" onClick={handleExpand} className="em-btn em-btn-sm">
              {internalState.expanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>
      )}

      <div className="em-body">
        {Array.isArray(filteredData) && filteredData.length > 0 ? (
          <ul className="em-list">
            {filteredData.map((item, index) => (
              <li
                key={item.id || item.employeeId || index}
                className={`em-item ${internalState.selected === item ? 'em-selected' : ''}`}
                onClick={() => handleClick(item)}
              >
                <div className="em-item-content">
                  <span className="em-item-title">
                    {item.fullName || item.name || item.title || item.employeeId || `Item ${index + 1}`}
                  </span>
                  {item.jobTitle && <span className="em-item-subtitle">{item.jobTitle}</span>}
                  {item.departmentName && <span className="em-item-meta">{item.departmentName}</span>}
                  {item.status && (
                    <span className={`em-badge em-badge-${String(item.status).toLowerCase()}`}>
                      {item.status}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="em-empty">
            <p>No data available for EmployeeTable.</p>
          </div>
        )}
      </div>

      {internalState.expanded && (
        <div className="em-footer">
          <p className="em-meta">Showing {filteredData.length} item(s)</p>
        </div>
      )}
    </div>
  );
}

EmployeeTable.defaultProps = {
  data: [],
  loading: false,
  error: null,
  showHeader: true,
  compact: false
};

export default EmployeeTable;
