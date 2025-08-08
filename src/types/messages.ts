import { Document } from "mongoose";

interface IMessage {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text: {
    body: string;
  };
}

interface IContact {
  profile: {
    name: string;
  };
  wa_id: string;
}

interface IChangeValue {
  messaging_product: string;
  metadata: {
    display_phone_number: string;
    phone_number_id: string;
  };
  contacts: IContact[];
  messages: IMessage[];
}

interface IChange {
  field: string;
  value: IChangeValue;
}

interface IEntry {
  id: string;
  changes: IChange[];
}

export interface IWhatsappMessage extends Document {
  payload_type: string;
  metaData: {
    entry: IEntry[];
    gs_app_id: string;
    object: string;
  };
  createdAt: Date;
  startedAt: Date;
  completedAt: Date;
  executed: boolean;
}
