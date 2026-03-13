export interface NoiseMachine {
  machine_id: string;
  title: string;
  subtitle: string;
  url: string;
  error?: string;
}

export interface SupergenNoiseMachine {
  position: number;
  php_file: string;
  page_url: string;
  config: Record<string, any>;
  machine_id: string;
}

export interface RedditPost {
  id: string;
  title: string;
  author: string;
  score: number;
  created_utc: number;
  permalink: string;
  num_comments: number;
}

export interface Supergen {
  url: string;
  noise_machines: SupergenNoiseMachine[];
  machine_count: number;
  reddit_post: RedditPost;
}

export interface HarvestedData {
  metadata: {
    harvested_at: string;
    total_posts: number;
    total_supergens: number;
    total_machines: number;
  };
  noise_machines: Record<string, NoiseMachine>;
  supergens: Supergen[];
}