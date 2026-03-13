import React from 'react';
import { NoiseMachine } from '../types';

interface FilterPanelProps {
  machines: NoiseMachine[];
  selectedMachines: Set<string>;
  onMachineToggle: (machineId: string) => void;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  machines,
  selectedMachines,
  onMachineToggle,
  onClearFilters
}) => {
  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filter by Noise Machine</h3>
        {selectedMachines.size > 0 && (
          <button className="clear-filters-btn" onClick={onClearFilters}>
            Clear ({selectedMachines.size})
          </button>
        )}
      </div>

      <div className="machine-list">
        {machines.length === 0 ? (
          <p className="no-machines">No noise machines found</p>
        ) : (
          machines.map(machine => (
            <label key={machine.machine_id} className="machine-checkbox">
              <input
                type="checkbox"
                checked={selectedMachines.has(machine.machine_id)}
                onChange={() => onMachineToggle(machine.machine_id)}
              />
              <div className="machine-info">
                <div className="machine-title">{machine.title}</div>
                {machine.subtitle && (
                  <div className="machine-subtitle">{machine.subtitle}</div>
                )}
              </div>
            </label>
          ))
        )}
      </div>
    </div>
  );
};

export default FilterPanel;