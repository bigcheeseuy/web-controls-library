import { IRenderer } from "../../../common/interfaces";
import { CheckBox } from "../../../checkbox/checkbox";

export class CheckBoxRender implements IRenderer {
  constructor(public component: CheckBox) {}
  protected nativeInput: HTMLInputElement;
  private inputId: string;

  getNativeInputId() {
    return this.nativeInput.id;
  }

  private getCssClasses() {
    const checkbox = this.component;

    const classList = [];

    classList.push("custom-control-input");

    if (checkbox.cssClass) {
      classList.push(checkbox.cssClass);
    }

    if (!checkbox.caption) {
      classList.push("position-static");
    }

    return classList.join(" ");
  }

  getValueFromEvent(event: UIEvent): boolean {
    return event.target && (event.target as HTMLInputElement).checked;
  }

  /**
   * Update the native input element when the value changes
   */
  checkedChanged() {
    const inputEl = this.nativeInput;
    if (inputEl && inputEl.checked !== this.component.checked) {
      inputEl.checked = this.component.checked;
    }
  }

  componentDidUnload() {
    this.nativeInput = null;
  }

  render() {
    const checkbox = this.component;

    if (!this.inputId) {
      this.inputId = checkbox.id
        ? `${checkbox.id}__checkbox`
        : `gx-checkbox-auto-id-${autoCheckBoxId++}`;
    }

    const attris = {
      "aria-disabled": checkbox.disabled ? "true" : undefined,
      class: this.getCssClasses(),
      disabled: checkbox.disabled,
      id: this.inputId,
      onChange: checkbox.handleChange.bind(checkbox),
      ref: input => (this.nativeInput = input as any)
    };

    const forAttris = {
      for: attris.id
    };

    return (
      <div class="custom-control custom-checkbox">
        <input {...attris} type="checkbox" checked={checkbox.checked} />
        <label
          class="custom-control-label"
          {...forAttris}
          aria-hidden={!checkbox.caption}
        >
          {checkbox.caption}
        </label>
      </div>
    );
  }
}

let autoCheckBoxId = 0;
