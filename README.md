# Coach me

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

## Live Demo

https://coachme-henry.netlify.app/

## Description

A simple coach booking application, which allows you to

1. Check available coaches;
2. Check what 30-minutes slots are available to schedule with a particular coach;
3. Book an appiontment with a coach at one of their available times.

## Screenshots

## Features

### Check available coaches

You can see all the available coaches at homepage, with their brief info (name, timezone, availablility)

Click the coach card to check the detail time slot.

### Browse available time slot based on different timezone

You can browse all the available time slots for your selected coach.
The timezone is default as the coach's timezone, and you can select timezone via the dropdown menu (choose your location).

All the time slot will automatically update if you change your location.

### Select time slot, confirm or cancel booking

You can select any time slot.

If the time slot is already been selected, click again to cancel this booking.

If you select a different time slot, a dialog with booking details will popup, and you can confirm or cancel booking.

If you click 'confirm', the booking info will store in localstorage and the page will jump to home page, and your next booking info will display on homepage. If you click 'cancel' or press 'ESC' in dialog, the booking info will change back to the preivous one.

### Full booking info with different timezone

In the confirmation dialog, you can see time slots at both your selected location and coach's location.

## Tools used

- Vue.js
- Vuex
- Moment.js
- Axios
- CSS/SASS
- Element UI
- Font awesome
- Localstorage
- Responsive Design
