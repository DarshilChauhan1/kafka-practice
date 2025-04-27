import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationServiceService } from './notification-service.service';
import { CreateNotificationServiceDto } from './dto/create-notification-service.dto';
import { UpdateNotificationServiceDto } from './dto/update-notification-service.dto';

@Controller('notification-service')
export class NotificationServiceController {
  constructor(private readonly notificationServiceService: NotificationServiceService) {}

  @Post()
  create(@Body() createNotificationServiceDto: CreateNotificationServiceDto) {
    return this.notificationServiceService.create(createNotificationServiceDto);
  }

  @Get()
  findAll() {
    return this.notificationServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationServiceDto: UpdateNotificationServiceDto) {
    return this.notificationServiceService.update(+id, updateNotificationServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationServiceService.remove(+id);
  }
}
