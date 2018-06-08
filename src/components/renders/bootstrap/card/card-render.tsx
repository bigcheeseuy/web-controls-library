import Popper from "popper.js";

type Constructor<T> = new (...args: any[]) => T;
export function CardRender<T extends Constructor<{}>>(Base: T) {
  return class extends Base {
    element: HTMLElement;

    private bodyClickHandler;

    private popper;

    private handleDropDownToggleClick(evt) {
      const dropDownMenu = this.element.querySelector(".dropdown-menu");
      dropDownMenu.classList.toggle("show");
      const toggleButton = evt.target;

      if (this.popper) {
        this.popper.destroy();
      }
      this.popper = new Popper(toggleButton, dropDownMenu, {
        placement: "bottom-start"
      });

      this.bodyClickHandler = bodyClickEvt => {
        const target: HTMLElement = bodyClickEvt.target as HTMLElement;

        if (target === toggleButton) {
          return;
        }

        dropDownMenu.classList.remove("show");
      };

      setTimeout(() => {
        document.body.addEventListener("click", this.bodyClickHandler, {
          once: true
        });
      }, 10);
    }

    componentDidUnload() {
      if (this.bodyClickHandler) {
        document.body.removeEventListener("click", this.bodyClickHandler);
      }
      if (this.popper) {
        this.popper.destroy();
      }
    }

    render() {
      const buttonActions = Array.from(
        this.element.querySelectorAll(
          `gx-button[slot='high-priority-action'],
           gx-button[slot='normal-priority-action']`
        )
      );
      buttonActions.forEach((btn: any) => (btn.size = "small"));

      const lowPriorityActions = Array.from(
        this.element.querySelectorAll("[slot='low-priority-action']")
      );
      lowPriorityActions.forEach((action: any) => {
        if (action.cssClass && action.cssClass.indexOf("dropdown-item") >= 0) {
          return;
        }

        action.cssClass = (action.cssClass || "") + " dropdown-item";
      });

      const hasLowPriorityActions = lowPriorityActions.length > 0;

      const hasFooterActions =
        hasLowPriorityActions ||
        !!this.element.querySelector("[slot='normal-priority-action']");

      const hasHeaderActions = !!this.element.querySelector(
        "[slot='high-priority-action']"
      );

      const renderHeader =
        hasHeaderActions || !!this.element.querySelector("[slot='header']");

      const renderFooter =
        hasFooterActions || !!this.element.querySelector("[slot='footer']");

      return (
        <div class="card">
          {renderHeader && (
            <div class="card-header">
              <slot name="header" />
              {hasHeaderActions && (
                <div class="float-right">
                  <slot name="high-priority-action" />
                </div>
              )}
            </div>
          )}
          <slot name="body" />
          <slot />
          {renderFooter && (
            <div class="card-footer">
              <slot name="footer" />
              {hasFooterActions && (
                <div class="float-right">
                  <slot name="normal-priority-action" />
                  {hasLowPriorityActions && (
                    <button
                      class="btn btn-sm gx-dropdown-toggle"
                      type="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                      aria-label="More actions"
                      onClick={this.handleDropDownToggleClick.bind(this)}
                    />
                  )}
                  {hasLowPriorityActions && (
                    <div class="dropdown-menu">
                      <slot name="low-priority-action" />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  };
}