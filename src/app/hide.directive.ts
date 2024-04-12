import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Directive({
  selector: '[hideDrawer]',
  standalone: true
})
export class HideDirective {

	hidden = false;

  constructor(
    private _templateRef: TemplateRef<MatDrawer>,
    private _viewContainer: ViewContainerRef
  ){}

  @Input()
  set isHidden(hidden: boolean) {
		
  }

  ngOnInit() {
		this._viewContainer.clear();
		this._viewContainer.createEmbeddedView(this._templateRef);
  }
}