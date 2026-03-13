import React from 'react';
import { Supergen, NoiseMachine } from '../types';

interface SupergenCardProps {
  supergen: Supergen;
  noiseMachines: Record<string, NoiseMachine>;
}

const SupergenCard: React.FC<SupergenCardProps> = ({ supergen, noiseMachines }) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div className="supergen-card">
      <div className="card-header">
        <h3 className="card-title">{supergen.reddit_post.title}</h3>
        <div className="card-meta">
          <span className="vote-count">⬆ {supergen.reddit_post.score}</span>
          <span className="comment-count">💬 {supergen.reddit_post.num_comments}</span>
          <span className="machine-count">🎵 {supergen.machine_count} machines</span>
        </div>
      </div>

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
              return (
                <div key={idx} className="machine-tag">
                  <span className="position">{nm.position}.</span>
                  <span className="machine-name">
                    {machine ? machine.title : nm.machine_id}
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
    </div>
  );
};

export default SupergenCard;