import { geterateTimeSlot } from './geterate_time_slot';

export const publicData = {
  genders: ['Male', 'Female', 'Other'],
  diets: ['Vegetarian', 'Non-vegetarian', 'Vegan'],
  bloodGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  availableDay: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  paymentMode: ['Cash Payment', 'Cheque', 'Debit/Credit Card'],
  paymentStatus: ['Paid', 'Unpaid'],
  timeSlot: geterateTimeSlot(),
};
