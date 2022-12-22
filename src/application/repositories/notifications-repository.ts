import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
  abstract create(notifications: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
  abstract findManyByrecipientId(recipientId: string): Promise<Notification[]>;
}
