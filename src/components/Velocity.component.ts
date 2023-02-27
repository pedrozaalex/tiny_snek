import { Component } from "@asimov-ts/core";

export class VelocityComponent extends Component<{ dx: number; dy: number }> {
  constructor(dx = 0, dy = 0) {
    super({ dx, dy });
  }
}
