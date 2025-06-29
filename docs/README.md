# Receipt Tracker (Expensio) - Project Documentation

## Overview

Expensio is a SaaS receipt tracking application built with modern web technologies. This documentation covers the current state of the project and provides step-by-step guides for development and deployment.

## Project Status

**Current Phase**: Foundation & Authentication Setup  
**Last Updated**: December 2024

### ✅ Completed Features

- [x] Project setup with Next.js 15 + React 19
- [x] Authentication system with Clerk
- [x] Database backend with Convex
- [x] Subscription management with Schematic
- [x] Basic UI components and navigation
- [x] Development environment configuration

### 🚧 In Progress

- [ ] Core receipt tracking functionality
- [ ] Database schema for receipts and users
- [ ] File upload and storage system

### 📋 Planned Features

- [ ] Receipt upload and OCR processing
- [ ] Receipt categorization and tagging
- [ ] Expense reporting and analytics
- [ ] Export functionality
- [ ] Team collaboration features

## Documentation Structure

### 📚 Getting Started

- [Project Setup](./setup/README.md) - Initial project configuration
- [Environment Variables](./setup/environment-variables.md) - Required environment configuration
- [Development Workflow](./setup/development-workflow.md) - How to run and develop the project

### 🏗️ Architecture

- [Technical Stack](./architecture/tech-stack.md) - Overview of technologies used
- [Project Structure](./architecture/project-structure.md) - File organization and conventions
- [Database Schema](./architecture/database-schema.md) - Current and planned database design

### 🔧 Implementation Guides

- [Authentication Setup](./implementation/authentication.md) - Clerk integration guide
- [Database Setup](./implementation/database.md) - Convex configuration
- [Subscription Management](./implementation/subscriptions.md) - Schematic integration
- [UI Components](./implementation/ui-components.md) - Component library and styling

### 🚀 Deployment

- [Production Deployment](./deployment/README.md) - How to deploy to production
- [Environment Configuration](./deployment/environment-setup.md) - Production environment variables

### 🐛 Troubleshooting

- [Common Issues](./troubleshooting/common-issues.md) - Solutions to frequent problems
- [Debugging Guide](./troubleshooting/debugging.md) - How to debug issues

## Quick Start

1. **Clone and Install**

   ```bash
   git clone <repository-url>
   cd receipt-tracker
   pnpm install
   ```

2. **Set up Environment Variables**

   ```bash
   cp .env.example .env.local
   # Fill in your environment variables
   ```

3. **Start Development**

   ```bash
   pnpm dev
   ```

4. **Open Application**
   - Frontend: http://localhost:3000
   - Convex Dashboard: http://localhost:8000

## Contributing

See [Development Guidelines](./contributing/README.md) for information on how to contribute to this project.

## Support

For issues and questions:

- Check the [Troubleshooting Guide](./troubleshooting/common-issues.md)
- Review [Common Issues](./troubleshooting/common-issues.md)
- Create an issue in the project repository
