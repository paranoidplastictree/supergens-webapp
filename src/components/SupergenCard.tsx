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

  const toggle = () => setExpanded(e => !e);

  return (
    <div className={`supergen-card ${expanded ? 'expanded' : 'collapsed'}`}>
      <button
        className="card-header"
        onClick={toggle}
        aria-expanded={expanded}
        aria-label={`${expanded ? 'Collapse' : 'Expand'} ${supergen.title}`}
      >
        <div className="card-title-row">
          <span className="expand-toggle" aria-hidden="true">{expanded ? '▾' : '▸'}</span>
          <h3 className="card-title">
            <a
              href={supergen.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${supergen.title} on MyNoise (opens in new tab)`}
              onClick={e => e.stopPropagation()}
            >
              {supergen.title}
            </a>
          </h3>
        </div>
        <div className="card-machines-preview" aria-label="Noise machines">{machineTitles}</div>
        <div className="card-meta">
          <span className="vote-count" aria-label={`${supergen.reddit_post.score} upvotes`}>⬆ {supergen.reddit_post.score}</span>
          <span className="comment-count" aria-label={`${supergen.reddit_post.num_comments} comments`}>💬 {supergen.reddit_post.num_comments}</span>
          <span className="machine-count" aria-label={`${supergen.machine_count} noise machines`}>🎵 {supergen.machine_count} machines</span>
        </div>
      </button>

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
                    <span className="position" aria-hidden="true">{nm.position}.</span>
                    <span className="machine-name">
                      {machineUrl ? (
                        <a href={machineUrl} target="_blank" rel="noopener noreferrer" aria-label={`${machine ? machine.title : nm.machine_id} (opens in new tab)`}>
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
              aria-label="Open on MyNoise (opens in new tab)"
            >
              Open on MyNoise
            </a>
            <a
              href={supergen.reddit_post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              aria-label="View Reddit post (opens in new tab)"
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
