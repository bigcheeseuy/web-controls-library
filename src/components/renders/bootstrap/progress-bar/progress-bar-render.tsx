import { IRenderer } from "../../../common/interfaces";
import { ProgressBar } from "../../../progress-bar/progress-bar";

export class ProgressBarRender implements IRenderer {
  constructor(public component: ProgressBar) {}

  render() {
    return (
      <div class="progress">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated bg-primary"
          style={{ width: this.component.value + "%" }}
          aria-valuenow={this.component.value}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <slot />
        </div>
      </div>
    );
  }
}
