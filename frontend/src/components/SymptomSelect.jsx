import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * Searchable symptom picker (combobox).
 *
 *  - Filters `options` as the user types (case-insensitive substring).
 *  - When the typed text matches no known symptom, it is treated as outside our
 *    recognized set (potentially serious). Instead of adding it, the dropdown
 *    offers a "see a doctor" action that calls `onUnrecognized(name)`.
 *
 * Props:
 *   value          - currently selected symptom name (string)
 *   options        - array of known symptom names to choose from
 *   onChange       - (name) => void, called when a known option is selected
 *   onUnrecognized - (name) => void, called to refer the user to a doctor
 */
const SymptomSelect = ({ value, options, onChange, onUnrecognized, placeholder = 'Search symptom…' }) => {
  const [query, setQuery] = useState(value || '');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef(null);

  // Keep the input text in sync when the selected value changes externally.
  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  // Close the dropdown on any click outside the component.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setQuery(value || ''); // discard unselected typing
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  const trimmed = query.trim();
  const filtered = options.filter((o) =>
    o.toLowerCase().includes(trimmed.toLowerCase())
  );
  const exactMatch = options.some((o) => o.toLowerCase() === trimmed.toLowerCase());
  const unrecognized = trimmed.length > 0 && !exactMatch;

  // Flattened list the highlight index maps onto.
  const items = [
    ...filtered.map((name) => ({ type: 'option', name })),
    ...(unrecognized ? [{ type: 'seeDoctor' }] : []),
  ];

  const select = (name) => {
    onChange(name);
    setQuery(name);
    setOpen(false);
  };

  const activate = (item) => {
    if (!item) return;
    if (item.type === 'seeDoctor') onUnrecognized(trimmed);
    else select(item.name);
  };

  const handleKeyDown = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setOpen(true);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      activate(items[highlight]);
    } else if (e.key === 'Escape') {
      setOpen(false);
      setQuery(value || '');
    }
  };

  return (
    <div className="symptom-combobox" ref={containerRef}>
      <input
        className="symptom-name"
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setHighlight(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
      />

      {open && (
        <ul className="symptom-dropdown" role="listbox">
          {items.map((item, i) =>
            item.type === 'option' ? (
              <li
                key={item.name}
                className={`symptom-option ${i === highlight ? 'active' : ''}`}
                role="option"
                aria-selected={i === highlight}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  select(item.name);
                }}
              >
                {item.name}
              </li>
            ) : (
              <li
                key="__seeDoctor__"
                className={`symptom-option see-doctor ${i === highlight ? 'active' : ''}`}
                role="option"
                aria-selected={i === highlight}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onUnrecognized(trimmed);
                }}
              >
                <AlertTriangle size={16} />
                <span>
                  <strong>“{trimmed}”</strong> isn’t a recognized symptom — see a doctor
                </span>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default SymptomSelect;
