import { Component } from "@asimov-ts/core";
import { GameEvent } from "../systems";

export type IEventPayloadValue = number | string | boolean | object;

export interface IEvent {
  type: GameEvent;
  payload?: IEventPayloadValue | IEventPayloadValue[];
}

export class EventQueue extends Component<IEvent[]> {
  constructor(events: IEvent[] = []) {
    super(events);
  }
}
