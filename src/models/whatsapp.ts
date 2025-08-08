import { IWhatsappMessage } from "@/types/messages";
import { Schema, model, models } from "mongoose";

const WhatsappMessageSchema = new Schema<IWhatsappMessage>(
  {
    payload_type: { type: String, required: true },
    metaData: {
      type: {
        entry: [
          {
            changes: [
              {
                field: { type: String, required: true },
                value: {
                  contacts: [
                    {
                      profile: {
                        name: { type: String, required: true },
                      },
                      wa_id: { type: String, required: true },
                    },
                  ],
                  messages: [
                    {
                      from: { type: String, required: true },
                      id: { type: String, required: true },
                      type: { type: String, required: true },
                      timestamp: { type: String, required: true },
                      text: {
                        body: { type: String, required: false }, // optional
                      },
                    },
                  ],
                  messaging_product: { type: String, required: true },
                  metadata: {
                    display_phone_number: { type: String, required: true },
                    phone_number_id: { type: String, required: true },
                  },
                },
              },
            ],
            id: { type: String, required: true },
          },
        ],
        gs_app_id: { type: String, required: true },
        object: { type: String, required: true },
      },
      required: true,
    },
    createdAt: { type: Date, required: true },
    startedAt: { type: Date, required: true },
    completedAt: { type: Date, required: true },
    executed: { type: Boolean, required: true },
  },
);

export const WhatsappMessage = models["processed_messages"] || model<IWhatsappMessage>("processed_messages", WhatsappMessageSchema);

