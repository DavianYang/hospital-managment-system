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

- [x] `POST`: `/admins/login`
- [x] `POST`: `/admins/logout`
- [x] `GET`: `/admins`
- [x] `POST`: `/admins`
- [x] `GET`: `/admins/:id`
- [x] `PATCH`: `/admins/:id`
- [x] `DELETE`: `/admins/:id`
- [x] `GET`: `/admins/me`
- [x] `PATCH`: `/admins/me`
- [x] `DELETE`: `/admins/me`

### Doctor

- [x] `POST`: `/doctors/register`
- [x] `POST`: `/doctors/login`
- [x] `POST`: `/doctors/logout`
- [x] `GET`: `/doctors`
- [x] `POST`: `/doctors`
- [x] `GET`: `/doctors/:id`
- [x] `PATCH`: `/doctors/:id`
- [x] `DELETE`: `/doctors/:id`
- [x] `GET`: `/doctors/me`
- [x] `PATCH`: `/doctors/me`
- [x] `DELETE`: `/doctors/me`
- [ ] `GET`: `/doctors/schedules`
- [ ] `DELETE`: `/doctors/schedules`

### Patient

- [x] `POST`: `/patients/register`
- [x] `POST`: `/patients/login`
- [x] `POST`: `/patients/logout`
- [x] `GET`: `/patients`
- [x] `POST`: `/patients`
- [x] `GET`: `/patients/:id`
- [x] `PATCH`: `/patients/:id`
- [x] `DELETE`: `/patients/:id`
- [x] `GET`: `/patients/me`
- [x] `PATCH`: `/patients/me`
- [x] `DELETE`: `/patients/me`
- [ ] `GET`: `/patients/me/appointments`
- [x] `POST`: `/patients/me/appointments`
- [ ] `DELETE`: `/patients/me/appointments`

### Hospital

- [x] `GET`: `/hospitals`
- [x] `POST`: `/hospitals`
- [x] `GET`: `/hospitals/:id`
- [x] `PATCH`: `/hospitals/:id`
- [x] `DELETE`: `/hospitals/:id`
- [x] `POST`: `/hospitals/:id/doctor`

### Schedule

- [x] `GET`: `/schedules`
- [x] `POST`: `/schedules`
- [x] `GET`: `/schedules/:id`
- [x] `PATCH`: `/schedules/:id`
- [x] `DELETE`: `/schedules/:id`

## In case of Future Development

### Architecture and Coding Flow

- [ ] Transaction required in routes
- [ ] Suggest to use IOC container for dependency injection and modular development (example, [inversify](https://inversify.io/))
- [ ] Need better route configuration
- [ ] Need better authorization
- [ ] Plugin system with event emitting for Email, SMS and others

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
