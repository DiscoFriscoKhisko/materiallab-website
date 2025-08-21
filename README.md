# MaterialLab - AI Product Studio Website

A modern, responsive website for MaterialLab AI Product Studio built with Vite, React, TypeScript, and Tailwind CSS.

## Features

- **Dual User Journey**: Tailored experiences for Certain Users (know what they want) and Explorative Users (exploring possibilities)
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Modern Tech Stack**: Vite, React 19, TypeScript, Tailwind CSS
- **Fast Performance**: Optimized build with Vite's lightning-fast HMR

## Development

### Prerequisites
- Node.js (v18 or higher)
- npm

### Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:8000`

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## Deployment on Cloudflare Pages

### Option 1: Using Cloudflare Dashboard

1. Build the project:
   ```bash
   npm run build
   ```

2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Create a new project
4. Connect your GitHub repository
5. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`

### Option 2: Using Cloudflared CLI

1. **Install cloudflared**:
   ```bash
   # macOS
   brew install cloudflared
   
   # Or download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
   ```

2. **Login to Cloudflare**:
   ```bash
   cloudflared login
   ```

3. **Create a tunnel**:
   ```bash
   cloudflared tunnel create materiallab
   ```

4. **Configure the tunnel** (create `tunnel.yml`):
   ```yaml
   tunnel: <tunnel-id>
   credentials-file: /path/to/credentials.json
   
   ingress:
     - hostname: materiallab.io
       service: http://localhost:8000
     - service: http_status:404
   ```

5. **Run the tunnel**:
   ```bash
   cloudflared tunnel run materiallab
   ```

6. **Set up DNS** (one time):
   ```bash
   cloudflared tunnel route dns materiallab materiallab.io
   ```

### Domain Configuration

To use your custom domain `materiallab.io`:

1. Add the domain to your Cloudflare Pages project
2. Update your DNS settings to point to Cloudflare
3. Enable SSL/TLS (Full mode recommended)

## Project Structure

```
src/
├── components/
│   ├── Layout/          # Main layout wrapper
│   ├── Navigation/      # Site navigation
│   ├── PathSelector/    # User journey selection
│   └── ServiceCards/    # Service display components
├── pages/
│   ├── Landing/         # Home page with path selection
│   ├── CertainUser/     # Journey for users who know what they want
│   └── ExplorativeUser/ # Journey for exploratory users
└── utils/               # Utility functions
```

## Technologies Used

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Deployment**: Cloudflare Pages
- **Version Control**: Git

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is private and proprietary to MaterialLab.