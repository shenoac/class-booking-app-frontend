# Studio Sessions Project - Overview (Non-Technical)

## 1. Users & Roles

### - Artist:
  - **Description**: A user who teaches art classes, manages class offerings, and displays their profile with artwork and achievements.
  - **Goals**:
    - Create and manage class schedules.
    - Showcase their artwork and profile to attract students.
    - View and manage bookings and payments.
  - **Key Features**:
    - Profile creation and management (artwork, achievements).
    - Class management (create/edit classes, set availability, etc.).
    - Payment management for booked classes.
   
### - Student:
  - **Description**: A user who registers to take art classes, books sessions, and makes payments.
  - **Goals**:
    - Find and book available art classes.
    - View their profile and booking history.
    - Make payments for classes.
  - **Key Features**:
    - Booking system for available classes.
    - Profile with class history.
    - Payment integration for easy class booking.

### - Admin (Optional):
  - **Description**: A potential admin role to oversee users, classes, and bookings.
  - **Goals**:
    - Manage users (artists and students).
    - Monitor class activity and bookings.
  - **Key Features**:
    - Dashboard for managing users and content.

## 2. High-Level Features

- **User Profiles**:
  - Artists and students have distinct profile pages.
  - Artists showcase their artwork and list available classes.
  - Students can view their booking history and class schedules.

- **Class Booking System**:
  - A calendar or schedule system where students can view available classes, book a session, and pay.
  - Real-time availability updates (optional with WebSockets).
  - Notification system for booking confirmations and reminders.

- **Payment Integration**:
  - Integration with payment gateways (e.g., Stripe or PayPal) for booking and paying for classes.
  - Support for both one-time payments and possible future subscriptions for repeat classes.

- **Class Management**:
  - Artists create and manage their class offerings, including setting availability, prices, and capacity.
  - Artists can manage bookings, view student attendance, and track payments.

## 3. Goals

- **Artists**: A platform to showcase their work, manage classes, and earn through bookings.
- **Students**: A simple way to browse, book, and attend art classes, all within a seamless online platform.
- **Platform**: Build a trusted, easy-to-use web app that connects artists and students through learning and creativity.

## 4. User Flows

### - Artist Flow:
  1. Sign up or log in.
  2. Create a profile showcasing their work.
  3. Add classes with schedules, pricing, and availability.
  4. Manage incoming bookings and payments.

### - Student Flow:
  1. Browse available classes.
  2. Book and pay for a session.
  3. Attend the class and leave feedback (optional).
  4. View booking history and upcoming classes in their profile.

---

## Technologies Used

- **React (TypeScript)**: Main frontend framework.
- **React Router**: For managing navigation between different pages.
- **Axios**: For making HTTP requests to the backend REST APIs.
- **JWT**: Used for user authentication and authorization.
- **MaterialUI**: For styling the components and making the UI responsive.

## Running the Project

1. Clone the repository.
2. Install the project dependencies using your package manager.
3. Set up environment variables by creating a configuration file, ensuring that the API URL points to the backend (either local or production).
4. Start the development server, and then access the application via a local development URL.

## Communication with Backend

The frontend communicates with the backend (Java/Quarkus) via REST APIs for:
- User authentication and session management.
- Fetching class schedules and booking details.
- Managing user profiles.

## Future Enhancements

- Payments module integration.
- Improved UI/UX for managing bookings and classes.
- User profile enhancements (e.g., profile picture uploads).
- Class filtering and search functionality.
