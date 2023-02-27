import { Component } from "@asimov-ts/core";
import { GameEvent } from "../systems";

export class EventListener extends Component<
  Partial<Record<GameEvent, () => void>>
> {}
