import { IRenderer } from "../../../common/interfaces";
import { PasswordEdit } from "../../../password-edit/password-edit";

export class PasswordEditRender implements IRenderer {
  constructor(public component: PasswordEdit) {}

  private innerEdit: any;
  protected revealed = false;

  getNativeInputId() {
    return this.innerEdit.getNativeInputId();
  }

  private getValueFromEvent(event: UIEvent): string {
    return event.target && (event.target as HTMLInputElement).value;
  }

  handleChange(event: UIEvent) {
    this.component.value = this.getValueFromEvent(event);
    this.component.onChange.emit(event);
  }

  handleInput(event: UIEvent) {
    this.component.value = this.getValueFromEvent(event);
    this.component.onInput.emit(event);
  }

  handleTriggerClick() {
    this.innerEdit.type = this.revealed ? "text" : "password";
  }
  /**
   * Update the native input element when the value changes
   */
  valueChanged() {
    const innerEdit = this.innerEdit;
    if (innerEdit && innerEdit.value !== this.component.value) {
      innerEdit.value = this.component.value;
    }
  }

  componentDidUnload() {
    this.innerEdit = null;
  }

  render() {
    return (
      <gx-edit
        ref={input => (this.innerEdit = input as any)}
        css-class={this.component.cssClass}
        disabled={this.component.disabled}
        id={`gx-password-edit-${this.component.id}`}
        placeholder={this.component.placeholder}
        readonly={this.component.readonly}
        show-trigger={
          !this.component.readonly && this.component.showRevealButton
        }
        trigger-class={this.revealed ? "active" : ""}
        trigger-text={
          this.revealed
            ? this.component.revealButtonTextOff
            : this.component.revealButtonTextOn
        }
        type={this.revealed ? "text" : "password"}
        value={this.component.value}
        onChange={this.handleChange.bind(this)}
        onInput={this.handleInput.bind(this)}
      >
        <i
          class={"fa fa-eye" + (this.revealed ? "-slash" : "")}
          slot="trigger-content"
        />
      </gx-edit>
    );
  }
}
