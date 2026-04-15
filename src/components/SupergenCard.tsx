import React, { useState } from 'react';
import { Supergen, NoiseMachine } from '../types';

interface SupergenCardProps {
  supergen: Supergen;
  noiseMachines: Record<string, NoiseMachine>;
}

const SupergenCard: React.FC<SupergenCardProps> = ({ supergen, noiseMachines }) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  const machineTitles = supergen.noise_machines
    .map(nm => noiseMachines[nm.machine_id]?.title ?? nm.machine_id)
    .join(', ');

  return (
    <div className={`supergen-card ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="card-header" onClick={() => setExpanded(e => !e)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setExpanded(v => !v)}>
        <div className="card-title-row">
          <span className="expand-toggle">{expanded ? '▾' : '▸'}</span>
          <h3 className="card-title">
            <a
              href={supergen.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
            >
              {supergen.title}
            </a>
          </h3>
        </div>
        <div className="card-machines-preview">{machineTitles}</div>
        <div className="card-meta">
          <span className="vote-count">⬆ {supergen.reddit_post.score}</span>
          <span className="comment-count">💬 {supergen.reddit_post.num_comments}</span>
          <span className="machine-count">🎵 {supergen.machine_count} machines</span>
        </div>
      </div>

      {expanded && (
        <div className="card-body">
          <div className="post-info">
            <span className="author">by u/{supergen.reddit_post.author}</span>
            <span className="date">{formatDate(supergen.reddit_post.created_utc)}</span>
          </div>

          <div className="machines-section">
            <h4>Noise Machines:</h4>
            <div className="machine-tags">
              {supergen.noise_machines.map((nm, idx) => {
                const machine = noiseMachines[nm.machine_id];
                const machineUrl = machine?.url ?? nm.page_url;
                return (
                  <div key={idx} className="machine-tag">
                    <span className="position">{nm.position}.</span>
                    <span className="machine-name">
                      {machineUrl ? (
                        <a href={machineUrl} target="_blank" rel="noopener noreferrer">
                          {machine ? machine.title : nm.machine_id}
                        </a>
                      ) : (
                        machine ? machine.title : nm.machine_id
                      )}
                    </span>
                    {machine?.subtitle && (
                      <span className="machine-desc" title={machine.subtitle}>
                        - {machine.subtitle.substring(0, 50)}
                        {machine.subtitle.length > 50 && '...'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-actions">
            <a
              href={supergen.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Open on MyNoise
            </a>
            <a
              href={supergen.reddit_post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              View Reddit Post
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupergenCard;
