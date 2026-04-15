import { useState, useEffect, useMemo } from 'react';
import { HarvestedData, Supergen, NoiseMachine } from './types';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SupergenCard from './components/SupergenCard';
import './styles/App.css';

type SortOption = 'score' | 'recent' | 'machines' | 'comments';

function App() {
  const [data, setData] = useState<HarvestedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMachines, setSelectedMachines] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>('score');

  useEffect(() => {
    // Load data from JSON file
    fetch('./supergen_data.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load data:', err);
        setError('Failed to load supergen data. Please ensure supergen_data.json is available.');
        setLoading(false);
      });
  }, []);

  // Filter and sort supergens
  const filteredSupergens = useMemo(() => {
    if (!data) return [];

    let filtered = data.supergens;

    // Filter by selected noise machines
    if (selectedMachines.size > 0) {
      filtered = filtered.filter(supergen =>
        supergen.noise_machines.some(nm =>
          selectedMachines.has(nm.machine_id)
        )
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.reddit_post.score - a.reddit_post.score;
        case 'recent':
          return b.reddit_post.created_utc - a.reddit_post.created_utc;
        case 'machines':
          return b.machine_count - a.machine_count;
        case 'comments':
          return b.reddit_post.num_comments - a.reddit_post.num_comments;
        default:
          return 0;
      }
    });

    return filtered;
  }, [data, selectedMachines, sortBy]);

  // Get available noise machines for filtering
  const availableMachines = useMemo(() => {
    if (!data) return [];

    const machines = Object.values(data.noise_machines);

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return machines.filter(m =>
        m.title.toLowerCase().includes(query) ||
        m.subtitle.toLowerCase().includes(query) ||
        m.machine_id.toLowerCase().includes(query)
      );
    }

    return machines;
  }, [data, searchQuery]);

  const handleMachineToggle = (machineId: string) => {
    const newSelection = new Set(selectedMachines);
    if (newSelection.has(machineId)) {
      newSelection.delete(machineId);
    } else {
      newSelection.add(machineId);
    }
    setSelectedMachines(newSelection);
  };

  const handleClearFilters = () => {
    setSelectedMachines(new Set());
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="app loading">
        <div className="loading-spinner">Loading supergen data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app error">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <p>Make sure to run the harvester first: <code>python harvester.py</code></p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>MyNoise Supergen Search</h1>
        <div className="stats">
          {data && (
            <>
              <span>{data.metadata.total_supergens} supergens</span>
              <span>{data.metadata.total_machines} noise machines</span>
              <span>Last updated: {new Date(data.metadata.harvested_at).toLocaleDateString()}</span>
            </>
          )}
        </div>
      </header>

      <div className="app-content">
        <aside className="sidebar">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search noise machines..."
          />

          <FilterPanel
            machines={availableMachines}
            selectedMachines={selectedMachines}
            onMachineToggle={handleMachineToggle}
            onClearFilters={handleClearFilters}
          />
        </aside>

        <main className="main-content">
          <div className="toolbar">
            <div className="results-count">
              {filteredSupergens.length} supergen{filteredSupergens.length !== 1 ? 's' : ''} found
              {selectedMachines.size > 0 && ` (filtering by ${selectedMachines.size} machine${selectedMachines.size !== 1 ? 's' : ''})`}
            </div>

            <div className="sort-controls">
              <label>Sort by:</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)}>
                <option value="score">Reddit Score</option>
                <option value="recent">Most Recent</option>
                <option value="machines">Machine Count</option>
                <option value="comments">Comment Count</option>
              </select>
            </div>
          </div>

          <div className="supergen-list">
            {filteredSupergens.map(supergen => (
              <SupergenCard
                key={supergen.reddit_post.id + '|' + supergen.url}
                supergen={supergen}
                noiseMachines={data!.noise_machines}
              />
            ))}
          </div>

          {filteredSupergens.length === 0 && (
            <div className="no-results">
              <p>No supergens found matching your filters.</p>
              <button onClick={handleClearFilters}>Clear Filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;