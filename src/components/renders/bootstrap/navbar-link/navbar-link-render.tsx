import { IRenderer } from "../../../common/interfaces";
import { NavBarLink } from "../../../navbar-link/navbar-link";

export class NavBarLinkRender implements IRenderer {
  constructor(public component: NavBarLink) {}

  private handleClick(event: UIEvent) {
    if (this.component.disabled) {
      return;
    }

    this.component.onClick.emit(event);
    event.preventDefault();
  }

  render() {
    this.component.element.classList.add("nav-item");

    return (
      <a
        class={{
          active: this.component.active,
          disabled: this.component.disabled,
          "nav-link": true,
          [this.component.cssClass]: !!this.component.cssClass
        }}
        href={this.component.href}
        onClick={this.handleClick.bind(this)}
      >
        <slot />
      </a>
    );
  }
}
