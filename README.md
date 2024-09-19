Studio Sessions Project - Overview (non-technical)

 1. Users & Roles
   - Artist:
     - Description: A user who teaches art classes, manages class offerings, and displays their profile with artwork and achievements.
     - Goals:
       - Create and manage class schedules.
       - Showcase their artwork and profile to attract students.
       - View and manage bookings and payments.
     - Key Features:
       - Profile creation and management (artwork, achievements).
       - Class management (create/edit classes, set availability, etc.).
       - Payment management for booked classes.
     
   - Student:
     - Description: A user who registers to take art classes, books sessions, and makes payments.
     - Goals:
       - Find and book available art classes.
       - View their profile and booking history.
       - Make payments for classes.
     - Key Features:
       - Booking system for available classes.
       - Profile with class history.
       - Payment integration for easy class booking.

   - Admin (Optional):
     - Description: A potential admin role to oversee users, classes, and bookings.
     - Goals:
       - Manage users (artists and students).
       - Monitor class activity and bookings.
     - Key Features:
       - Dashboard for managing users and content.

 2. High-Level Features
   - User Profiles:
     - Artists and students have distinct profile pages.
     - Artists showcase their artwork and list available classes.
     - Students can view their booking history and class schedules.
   
   - Class Booking System:
     - A calendar or schedule system where students can view available classes, book a session, and pay.
     - Real-time availability updates (optional with WebSockets).
     - Notification system for booking confirmations and reminders.
   
   - Payment Integration:
     - Integration with payment gateways (e.g., Stripe or PayPal) for booking and paying for classes.
     - Support for both one-time payments and possible future subscriptions for repeat classes.

   - Class Management:
     - Artists create and manage their class offerings, including setting availability, prices, and capacity.
     - Artists can manage bookings, view student attendance, and track payments.

 3. Goals
   - Artists: A platform to showcase their work, manage classes, and earn through bookings.
   - Students: A simple way to browse, book, and attend art classes, all within a seamless online platform.
   - Platform: Build a trusted, easy-to-use web app that connects artists and students through learning and creativity.

 4. User Flows
   - Artist Flow:
     1. Sign up or log in.
     2. Create a profile showcasing their work.
     3. Add classes with schedules, pricing, and availability.
     4. Manage incoming bookings and payments.
   
   - Student Flow:
     1. Browse available classes.
     2. Book and pay for a session.
     3. Attend the class and leave feedback (optional).
     4. View booking history and upcoming classes in their profile.

     Studio Sessions - Technical Architecture Overview
1. Architecture Overview
Studio Sessions is a modular microservices-based application designed to connect artists with students for art classes. Each module serves a distinct purpose and is deployed and managed independently. The system uses a combination of technologies to ensure scalability, flexibility, and security.

Key Components:

User Management Service (Java/Quarkus): Handles user registration, authentication, and role-based access (Artist, Student, Admin).

Class Management Service (Node.js/Express): Manages the creation, scheduling, and booking of classes.

Payment Service (Node.js/Express): Facilitates secure payment processing for booking classes.

Frontend Application (React/TypeScript): Provides an interactive user interface for students and artists to interact with the platform.

Microservices:

User Management Service:
Built with Java (Quarkus).
Handles user roles (Artist, Student, Admin) and JWT-based authentication.
Externalized configuration for secure handling of environment-specific settings.
REST API-based communication with the frontend.

Class Management Service:
Node.js/Express microservice.
Manages the creation of classes by artists and booking by students.
Interfaces with the Payment Service for booking payments.

Payment Service:
Node.js/Express microservice with Stripe/PayPal integration.
Manages one-time payments for individual classes.

Integration Patterns:
API Gateway (future implementation): Will act as a single entry point for client requests, routing them to the appropriate microservices.

Service Communication: Microservices communicate over HTTP/REST, using JSON payloads. In the future, lightweight messaging (e.g., RabbitMQ) could be added for events like class bookings.

2. Data Management

Each microservice is responsible for its own data, ensuring loose coupling between components. Data management is handled via:

User Management Service: PostgreSQL database for user information, roles, and profiles.

Class Management Service: In-memory data storage for class scheduling, with plans for future persistence using PostgreSQL.

Payment Service: Payment data is managed securely through third-party payment processors (e.g., Stripe/PayPal).

3. Security

JWT Authentication: The User Management Service handles secure authentication using JSON Web Tokens (JWT).

Role-Based Access Control: Each endpoint in the User Management Service requires specific user roles (Artist, Student, Admin), ensuring that only authorized users can access certain features.

Externalized Configuration: Sensitive information, such as database passwords and mailer credentials, are stored securely as environment variables.

4. Deployment

Local Development: Services are run locally using Quarkus for Java and Node.js for Express-based microservices.

Production Deployment: The backend is deployed on Heroku, with plans to potentially scale specific services using containerization (e.g., Docker) and orchestration tools (e.g., Kubernetes).
