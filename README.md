# Hospital Management System

## Current Route

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
- [ ] `GET`: `/doctors/me`
- [ ] `PATCH`: `/doctors/me`
- [ ] `DELETE`: `/doctors/me`

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

### Hospital

- [x] `GET`: `/hospitals`
- [x] `POST`: `/hospitals`
- [x] `GET`: `/hospitals/:id`
- [x] `PATCH`: `/hospitals/:id`
- [x] `DELETE`: `/hospitals/:id`
- [x] `POST`: `/hospitals/:id/doctor` 

## Todo

- [ ] Update the type of input service body (current defined as `any`)
- [ ] Check open and closed hour of hospital when adding schedules
- [ ] Cancel Appointment
- [ ] Patients can check their appointment
- [ ] Doctors can check their schedules
- [ ] Transaction required in routes
- [ ] Caculate Approximate Countdown time 