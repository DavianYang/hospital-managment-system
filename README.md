# Hospital Management System

## Description

This is a coding test with the time given 24 hours (2 days).

## Required tools for Development

- [VSCode](https://code.visualstudio.com/)
- [Node.js v16](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) (preferably)

## Project Setup

### Git Clone the repository

```
git clone https://github.com/DavianYang/hospital-managment-system.git
```

### Installing Dependency

```
pnpm i
```

### Configure Environment

Please enter your development environment config by rename `.env.dev.example`
`.env.dev`

### Running in development

```
pnpm dev
```

## Available Routes

Prefix API - `/api/v1`

### Admin

- [x] `POST`: `/admins/login`               - Login admin user (able to configure superadmin in [config](src/config.ts))
- [x] `POST`: `/admins/logout`              - Logout admin user
- [x] `GET`: `/admins`                      - List admin users
- [x] `POST`: `/admins`                     - Create admin user
- [x] `GET`: `/admins/:id`                  - Get admin user with given id by admin
- [x] `PATCH`: `/admins/:id`                - Update admin user with given id by admin
- [x] `DELETE`: `/admins/:id`               - Delete admin user with given id by admin
- [x] `GET`: `/admins/me`                   - Check profile of current admin user
- [x] `PATCH`: `/admins/me`                 - Update profile of current admin user (unable to update `email` and `password`)
- [x] `DELETE`: `/admins/me`                - Delete profile of current admin user (unable to delete document instead of active: `false`)

### Doctor

- [x] `POST`: `/doctors/register`           - Register doctor user
- [x] `POST`: `/doctors/login`              - Login doctor user
- [x] `POST`: `/doctors/logout`             - Logout doctor user
- [x] `GET`: `/doctors`                     - List doctor users publicly
- [x] `POST`: `/doctors`                    - Create doctor user by admin
- [x] `GET`: `/doctors/:id`                 - Get doctor user with given id by admin
- [x] `PATCH`: `/doctors/:id`               - Update doctor user with given id by admin
- [x] `DELETE`: `/doctors/:id`              - Delete doctor user with given id by admin
- [x] `GET`: `/doctors/me`                  - Check profile of current doctor user
- [x] `PATCH`: `/doctors/me`                - Update profile of current doctor user (unable to update `email` and `password`)
- [x] `DELETE`: `/doctors/me`               - Delete profile of current admin user (unable to delete document instead of active: `false`)
- [ ] `GET`: `/doctors/schedules`           - Get schedules of current doctor user
- [ ] `DELETE`: `/doctors/schedules`        - Delete schedules of current doctor user

### Patient

- [x] `POST`: `/patients/register`          - Register patient user
- [x] `POST`: `/patients/login`             - Login patient user
- [x] `POST`: `/patients/logout`            - Logout patient user
- [x] `GET`: `/patients`                    - List patient users by admin
- [x] `POST`: `/patients`                   - Create patient user by admin
- [x] `GET`: `/patients/:id`                - Get patient user with given id by admin
- [x] `PATCH`: `/patients/:id`              - Update patient user with given id by admin
- [x] `DELETE`: `/patients/:id`             - Delete patient user with given id by admin
- [x] `GET`: `/patients/me`                 - Check profile of current patient user
- [x] `PATCH`: `/patients/me`               - Update profile of current patient user (unable to update `email` and `password`)
- [x] `DELETE`: `/patients/me`              - Delete profile of current patient user (unable to delete document instead of active: `false`)
- [ ] `GET`: `/patients/me/appointments`    - Get appointments of current patient user
- [x] `POST`: `/patients/me/appointments`   - Create appointments of current patient user
- [ ] `DELETE`: `/patients/me/appointments` - Cancel appointments of current patient user

### Role
- [x] `GET`: `/roles`                       - List roles by admin user
- [x] `POST`: `/roles`                      - Create role by admin user
- [x] `GET`: `/roles/:id`                   - Get role with given id by admin user
- [x] `PATCH`: `/roles/:id`                 - Update role with given id by admin user
- [x] `DELETE`: `/roles/:id`                - Delete role with given id by admin user

### Hospital

- [x] `GET`: `/hospitals`                   - List hospitals publicly
- [x] `POST`: `/hospitals`                  - Create hospital by admin user
- [x] `GET`: `/hospitals/:id`               - Get hospital with given id publicly
- [x] `PATCH`: `/hospitals/:id`             - Update hospital with given id by admin user
- [x] `DELETE`: `/hospitals/:id`            - Delete hospital with given id by admin user
- [x] `POST`: `/hospitals/:id/doctor`       - Add doctor with given id to hospital with given id

### Schedule

- [x] `GET`: `/schedules`                   - List schedules publicly
- [x] `POST`: `/schedules`                  - Create schedule by admin user
- [x] `GET`: `/schedules/:id`               - Get schedule with given id publicly
- [x] `PATCH`: `/schedules/:id`             - Update schedule with given id by admin user
- [x] `DELETE`: `/schedules/:id`            - Delete schedule with given id by admin user

## In case of Future Development

### Architecture and Coding Flow

- [ ] Transaction required in routes
- [ ] Suggest to use IOC container for dependency injection and modular development (e.g, [inversify](https://inversify.io/), [nestjs](https://nestjs.com/))
- [ ] Need better route configuration
- [ ] Need better authorization
- [ ] Plugin system with event emitting for Email, SMS and others
- [ ] Instead of using `JWT` token, suggest to use `Session` for better control on token management

### Type check
- [ ] Update the `type` of input service body (current defined as `any`)

### Features
- [ ] Check open and closed hour of hospital when adding `schedules`
- [ ] Cancel `Appointment`
- [ ] `Patients` can check their appointment
- [ ] `Doctors` can check their schedules
- [ ] Caculate approximate countdown time
- [ ] Able to publicly view single `doctor` by ID
- [ ] Create `ROLE_SUPER_ADMIN` for root `superuser`
- [ ] Create staff related to hospital such as `receptionist`, `nurses`, `departmentHeads`
- [ ] Able to guest checkout for `patients` when posting `appointments`
- [ ] Payment System
