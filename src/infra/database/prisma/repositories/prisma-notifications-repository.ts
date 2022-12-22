import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotifictionMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotifictionMapper.toDomain(notification);
  }

  async findManyByrecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recipientId },
    });

    return notifications.map(PrismaNotifictionMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.prisma.notification.count({
      where: { recipientId },
    });
  }

  async create(notifications: Notification): Promise<void> {
    const row = await PrismaNotifictionMapper.toPrisma(notifications);

    await this.prisma.notification.create({
      data: row,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotifictionMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: { id: raw.id },
      data: raw,
    });
  }
}
