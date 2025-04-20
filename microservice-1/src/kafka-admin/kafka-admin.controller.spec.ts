import { Test, TestingModule } from '@nestjs/testing';
import { KafkaAdminController } from './kafka-admin.controller';
import { KafkaAdminService } from './kafka-admin.service';

describe('KafkaAdminController', () => {
  let controller: KafkaAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KafkaAdminController],
      providers: [KafkaAdminService],
    }).compile();

    controller = module.get<KafkaAdminController>(KafkaAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
