import { Room } from "./Room";

export interface Booking {
  adults: number;
  approvedDate: string;
  cancelledDate: string;
  children: number;
  endDate: string;
  firstName: string;
  id: number;
  lastName: string;
  paidDate: string;
  startDate: string;
  status: string;
  telNumber: string;
  userId: number;
  room:Room;
}
export enum BookingStatus {
  'WAITING' = 'Ожидание оплаты',
  'APPROVED' = 'Подтверждено',
  'PAID' = 'Оплачено',
  'CANCELLED' = 'Отменено',
}
