import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface UnReadNotificationsRequest {
  notificationId: string;
}

type UnReadNotificationsResponse = void;

@Injectable()
export class UnReadNotifications {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: UnReadNotificationsRequest,
  ): Promise<UnReadNotificationsResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification?.unread();

    await this.notificationRepository.save(notification);
  }
}
