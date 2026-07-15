# NISAR AI Studio & Super AI Toolbox

This repository is configured for automatic deployment with Vercel and Bitbucket.

## Project Name

- NISAR AI Studio
- Super AI Toolbox

## Deployment Workflow

- Bitbucket → Source Control
- Vercel → Automatic Deployments
- Preview Deployment for every branch
- Production deployment from `main`
- Instant rollback support
- Custom domain support
- Environment variable management
- CI/CD using Bitbucket Pipelines
- Secure Git integration

## Supported Features

- AI Website Builder
- Full-Stack Development Platform
- Multi-Agent AI System
- AI Chat Workspace
- Prompt Library
- Automation Workflows
- File Manager
- Authentication
- Dashboard
- API Builder
- Database Integration
- MCP Tools
- AI Coding Assistant
- Git Repository Management
- Analytics
- Team Collaboration
- Plugin System
- Cloud Deployment

## Repository Information

Project: NISAR AI Studio Super AI Toolbox

Production Branch:
```

main

```

## Environment Variables

```env
APP_NAME="NISAR AI Studio"
APP_EDITION="Super AI Toolbox"

VERCEL_GIT_PROVIDER=bitbucket
VERCEL_GIT_REPO_OWNER=YOUR_BITBUCKET_USERNAME
VERCEL_GIT_REPO_SLUG=nisar-ai-studio
VERCEL_GIT_COMMIT_REF=main
NODE_ENV=production
```

## Deployment Pipeline

```

Developer
↓
Bitbucket Push
↓
Bitbucket Webhook
↓
Vercel Build
↓
Preview Deployment
↓
Production Deployment
↓
Custom Domain

```

## CI/CD

- Automatic Preview Deployments
- Automatic Production Deployments
- Pull Request Preview URLs
- Instant Rollbacks
- Build Cache
- Environment Variables
- Custom Domains
- Deployment Logs

## License

Copyright © 2026 NISAR AI Studio.
All rights reserved.