# Overview

This is a full-stack web application for a Unit Pelaksana Teknis Pembibitan dan Pembenihan (Technical Implementation Unit for Nursery and Seeding) that provides a dashboard interface for monitoring agricultural data. The application serves as a management system for tracking stock levels, production data, seed inventory, and distribution metrics, with real-time data visualization through charts and interactive components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using React with TypeScript, utilizing modern development practices and component-based architecture. The application uses Vite as the build tool for fast development and optimized production builds. The UI is constructed with shadcn/ui components, providing a consistent and professional design system built on top of Radix UI primitives.

**Key Frontend Decisions:**
- **React with TypeScript**: Chosen for type safety and modern development experience
- **Vite**: Selected for fast hot module replacement and efficient bundling
- **shadcn/ui + Radix UI**: Provides accessible, customizable components with consistent styling
- **Tailwind CSS**: Utility-first CSS framework for rapid styling and responsive design
- **TanStack Query**: Handles server state management, caching, and data synchronization
- **Wouter**: Lightweight client-side routing solution

## Backend Architecture
The backend follows a REST API pattern using Express.js with TypeScript, providing endpoints for dashboard data retrieval and admin configuration management. The server implements middleware for request logging, JSON parsing, and error handling.

**Key Backend Decisions:**
- **Express.js**: Lightweight and flexible web framework for Node.js
- **TypeScript**: Ensures type safety across the entire stack
- **In-memory storage**: Uses a simple storage abstraction for development and testing
- **Middleware pattern**: Implements logging, parsing, and error handling as reusable middleware

## Data Storage Solutions
The application uses a dual storage approach to accommodate different data sources and requirements:

**Database Schema (Drizzle + PostgreSQL):**
- User management with authentication credentials
- Configuration storage for admin settings
- Prepared for potential expansion with persistent data storage

**In-memory Storage:**
- Current implementation uses memory-based storage for rapid development
- Provides a clean abstraction layer that can be easily replaced with persistent storage
- Includes default admin user and configuration initialization

## Authentication and Authorization
The system implements a simple password-based authentication mechanism for admin access:

**Admin Authentication:**
- Password-based login system for admin panel access
- Configuration management restricted to authenticated users
- Session-based authentication using simple password validation

## Data Visualization and Real-time Updates
The application provides comprehensive data visualization capabilities:

**Chart Integration:**
- Chart.js integration for creating interactive data visualizations
- Real-time chart updates when new data is received
- Multiple chart types for different data categories (stock, production, seeds, distribution)

**Real-time Data Polling:**
- 30-second polling interval for dashboard data updates
- Connection status indicators to show data freshness
- Graceful error handling when data sources are unavailable

# External Dependencies

## Core Framework Dependencies
- **React 18**: Frontend framework with modern hooks and concurrent features
- **Express.js**: Backend web framework for Node.js
- **TypeScript**: Type system for JavaScript providing compile-time type checking

## Database and ORM
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **@neondatabase/serverless**: Serverless PostgreSQL client for database connections
- **PostgreSQL**: Configured as the target database system

## UI and Styling
- **Radix UI**: Comprehensive component library for accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Pre-built component system based on Radix UI and Tailwind
- **Lucide React**: Icon library providing consistent iconography

## State Management and API
- **TanStack React Query**: Server state management with caching and synchronization
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation for type-safe data parsing

## Development and Build Tools
- **Vite**: Build tool and development server with hot module replacement
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing tool for Tailwind CSS integration

## Visualization
- **Chart.js**: Charting library for data visualization (loaded via CDN)
- **Embla Carousel**: Carousel component for image galleries and content rotation

## Additional Utilities
- **date-fns**: Date manipulation and formatting utilities
- **clsx**: Utility for conditional CSS class composition
- **class-variance-authority**: Type-safe variant API for component styling