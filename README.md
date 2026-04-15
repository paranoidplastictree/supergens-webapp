# MyNoise Web App

Interactive search & filter interface for MyNoise supergens from r/mynoise.

## Features
- **Search**: Find noise machines by name, title, or description
- **Filter**: Select multiple noise machines to filter supergens
- **Sort**: By Reddit score, recency, or machine count
- **View**: See all noise machines in each supergen with descriptions
- **Links**: Direct links to MyNoise supergen & Reddit post

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy supergen data from harvester:
```bash
# First run the harvester to get data
cd ../supergens-harvester
python harvester.py

# Copy the data file to webapp public directory
cp supergen_data.json ../supergens-webapp/public/
```

3. Run development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in browser

## Build for Production

```bash
npm run build
```

Output will be in `dist/` directory. Deploy to any static hosting service.

## Tech Stack
- React 18 with TypeScript
- Vite for fast builds
- Pure CSS (no frameworks)
- Client-side filtering for instant results

## Data Update
To update supergen data, run the harvester again and copy the new `supergen_data.json` to public directory.
