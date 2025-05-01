import { Injectable, OnModuleInit } from '@nestjs/common';
import { UpdateMailDto } from './dto/update-mail.dto';
import { Consumer, Kafka } from 'kafkajs';
import { KafkaGroups } from 'src/common/enums/kafka-groups.enum';
import { KafkaTopics } from 'src/common/enums/kafka-topics.enum';
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailService implements OnModuleInit {
  kafka : Kafka
  kafkaConsumer : Consumer
  constructor() {
    this.kafka = new Kafka({
      clientId: 'kafka-test',
      brokers: ['localhost:9092'],
    });
  }

  async onModuleInit() {
    this.kafkaConsumer = this.kafka.consumer({ groupId: KafkaGroups.USER_GROUP });
    await this.kafkaConsumer.connect();
    await this.kafkaConsumer.subscribe({ topic: KafkaTopics.USER_TOPIC, fromBeginning: true });

    await this.kafkaConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const data = JSON.parse(message.value.toString());
        console.log(`Received message: ${data.action}`);
        await this.sendMail(data.data.email, data.data.subject);
      },
    });
  }

  async sendMail(mail : string, subject : string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      service: 'gmail',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'chauhandarshil716@gmail.com',
        pass : process.env.GOOGLE_APP_PASSWORD, // generated ethereal password
      }
    });
    console.log(transporter)
    console.log("Sending mail to: ", mail)

    const info = await transporter.sendMail({
      from: 'chauhandarshil716@gmail.com', // sender address
      to: mail, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    console.log(info)
  
    console.log("Message sent: %s", info.messageId)
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
