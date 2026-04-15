import React from 'react';

const AboutPage: React.FC = () => (
  <div className="about-page">
    <div className="about-content">
      <h2>About</h2>
      <p>Oh, hey. Thanks for visiting!</p>
      <p>
        This is an unofficial fan site, not affiliated with or endorsed by Dr. Ir. Stéphane Pigeon
        or <a href="https://mynoise.net" target="_blank" rel="noopener noreferrer">MyNoise.net</a> in any way.
      </p>
      <p>
        It indexes community-created <strong>supergens</strong> shared on{' '}
        <a href="https://www.reddit.com/r/mynoise" target="_blank" rel="noopener noreferrer">r/MyNoise</a>.
        Supergens are custom sound blends made with MyNoise.net's superGenerator tool. Browse, search,
        and filter by noise machine to find the perfect ambient soundscape.
      </p>
      <p>
        MyNoise.net is a remarkable project by Dr. Pigeon, offering high-quality customizable noise
        generators for focus, relaxation, sleep, and creativity. If you find it useful, please
        consider supporting it directly.
      </p>
      <div className="about-actions">
        <a href="https://mynoise.net" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Visit MyNoise.net
        </a>
        <a href="https://www.reddit.com/r/mynoise" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          r/MyNoise on Reddit
        </a>
      </div>
    </div>
  </div>
);

export default AboutPage;
