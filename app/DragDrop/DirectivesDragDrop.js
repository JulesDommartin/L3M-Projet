System.register(["@angular/core", "./DragDropUtils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, DragDropUtils_1;
    var DragManager, DM, dragDropInit, AlxDragDrop, AlxDraggable, AlxDropzone;
    // function noAcceptFct(draggedData) {return false;}
    function YES(data) { return true; }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (DragDropUtils_1_1) {
                DragDropUtils_1 = DragDropUtils_1_1;
            }],
        execute: function() {
            ;
            /*
            interface ShadowRoot extends DocumentFragment {
                styleSheets     : StyleSheetList;
                innerHTML       : string;
                host            : Element;
                activeElement   : Element;
                elementFromPoint        (x : number, y : number) : Element;
                elementsFromPoint       (x : number, y : number) : Element[];
                caretPositionFromPoint  (x : number, y : number); // => CaretPosition
            };
            
            interface ElementWithShadowRoot extends HTMLElement {
                shadowRoot  : ShadowRoot;
            };*/
            DragManager = class DragManager {
                constructor() {
                    this.draggedStructures = new Map();
                    this.dropZones = new Map();
                }
                //constructor() {}
                startDrag(idPointer, dragged) {
                    this.draggedStructures.set(idPointer, dragged);
                    let possibleDropZones = new Map();
                    this.dropZones.forEach(dz => {
                        if (dz.checkAccept(dragged)) {
                            dz.appendDropCandidatePointer(idPointer);
                            possibleDropZones.set(dz.root, dz);
                        }
                    });
                    return possibleDropZones;
                }
                isAssociatedToDropZone(element) {
                    return this.dropZones.has(element);
                }
                registerDropZone(dropzone) {
                    this.dropZones.set(dropzone.root, dropzone);
                }
                unregisterDropZone(dropzone) {
                    this.dropZones.delete(dropzone.root);
                }
                pointerMove(idPointer, x, y) {
                    let dragged = this.draggedStructures.get(idPointer);
                    if (dragged) {
                        dragged.move(x, y);
                    }
                    return dragged !== undefined;
                }
                pointerRelease(idPointer) {
                    let dragged = this.draggedStructures.get(idPointer);
                    if (dragged) {
                        dragged.stop();
                        this.draggedStructures.delete(idPointer);
                    }
                    return dragged !== undefined;
                }
            };
            ;
            DM = new DragManager();
            dragDropInit = false;
            AlxDragDrop = class AlxDragDrop {
                constructor() {
                    if (dragDropInit) {
                        console.error("Do not create multiple instance of directive alx-dragdrop !");
                    }
                    else {
                        console.log("AlxDragDrop enabled !");
                        dragDropInit = true;
                    }
                }
                mousemove(e) {
                    DM.pointerMove("mouse", e.clientX, e.clientY);
                }
                mouseup(e) {
                    DM.pointerRelease("mouse");
                }
                touchmove(e) {
                    for (let i = 0; i < e.changedTouches.length; i++) {
                        let touch = e.changedTouches.item(i);
                        if (DM.pointerMove(touch.identifier.toString(), touch.clientX, touch.clientY)) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                }
                touchend(e) {
                    for (let i = 0; i < e.changedTouches.length; i++) {
                        let touch = e.changedTouches.item(i);
                        if (DM.pointerRelease(touch.identifier.toString())) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                }
            };
            __decorate([
                core_1.HostListener("document: mousemove", ["$event"]), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object]), 
                __metadata('design:returntype', void 0)
            ], AlxDragDrop.prototype, "mousemove", null);
            __decorate([
                core_1.HostListener("document: mouseup", ["$event"]), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object]), 
                __metadata('design:returntype', void 0)
            ], AlxDragDrop.prototype, "mouseup", null);
            __decorate([
                core_1.HostListener("document: touchmove", ["$event"]), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object]), 
                __metadata('design:returntype', void 0)
            ], AlxDragDrop.prototype, "touchmove", null);
            __decorate([
                core_1.HostListener("document: touchend", ["$event"]), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object]), 
                __metadata('design:returntype', void 0)
            ], AlxDragDrop.prototype, "touchend", null);
            AlxDragDrop = __decorate([
                core_1.Directive({
                    selector: "*[alx-dragdrop]"
                }), 
                __metadata('design:paramtypes', [])
            ], AlxDragDrop);
            exports_1("AlxDragDrop", AlxDragDrop);
            AlxDraggable = class AlxDraggable {
                constructor(el) {
                    this.isBeingDragged = false;
                    this.cloneNode = null;
                    this.possibleDropZones = new Map();
                    this.root = el.nativeElement;
                    if (!dragDropInit) {
                        console.error("You should add one alx-dragdrop attribute to your code before using alx-draggable");
                    }
                    //console.log( "new instance of AlxDraggable", this );
                }
                ngOnDestroy() {
                    this.stop();
                }
                onMouseDown(event) {
                    //console.log("mousedown on", this, event);
                    event.preventDefault();
                    event.stopPropagation();
                    this.start("mouse", event.clientX, event.clientY);
                }
                onTouchStart(event) {
                    //console.log("touchstart on", this);
                    event.preventDefault();
                    event.stopPropagation();
                    for (let i = 0; i < event.changedTouches.length; i++) {
                        let touch = event.changedTouches.item(i);
                        this.start(touch.identifier.toString(), touch.clientX, touch.clientY);
                    }
                }
                start(idPointer, x, y) {
                    if (!this.isBeingDragged) {
                        this.isBeingDragged = true;
                        this.idPointer = idPointer;
                        let bbox = this.root.getBoundingClientRect();
                        this.ox = x;
                        this.oy = y;
                        this.dx = x - Math.round(bbox.left + window.pageXOffset);
                        this.dy = y - Math.round(bbox.top + window.pageYOffset);
                        this.tx = bbox.width;
                        this.ty = bbox.height; // console.log( "drag", this.tx, bbox.right - bbox.left );
                        this.possibleDropZones = DM.startDrag(idPointer, this);
                    }
                }
                stop() {
                    this.isBeingDragged = false;
                    if (this.cloneNode) {
                        if (this.cloneNode.parentNode) {
                            this.cloneNode.parentNode.removeChild(this.cloneNode);
                        }
                        this.cloneNode = null;
                    }
                    this.possibleDropZones.forEach(dz => {
                        dz.removeDropCandidatePointer(this.idPointer);
                        dz.removePointerHover(this.idPointer);
                    });
                    this.possibleDropZones.clear();
                    this.idPointer = null;
                    if (this.currentDropZone) {
                        this.currentDropZone.drop(this.data);
                    }
                    this.currentDropZone = null;
                }
                move(x, y) {
                    let element = null;
                    if (this.cloneNode === null) {
                        //if( Math.abs(x-this.ox) + Math.abs(y-this.oy) > 50 ) {
                        this.getClone();
                    }
                    if (this.cloneNode) {
                        this.cloneNode.style.left = (x - this.dx) + "px";
                        this.cloneNode.style.top = (y - this.dy) + "px";
                        let visibility = this.cloneNode.style.visibility;
                        this.cloneNode.style.visibility = "hidden";
                        // let L = <Array<Element>>myDoc.elementsFromPoint(x-window.pageXOffset, y-window.pageYOffset);
                        element = DragDropUtils_1.myDoc.elementFromPoint(x, y); //(x-window.pageXOffset, y-window.pageYOffset);
                        //console.log( "element", element );
                        this.cloneNode.style.visibility = visibility;
                        this.possibleDropZones.forEach(dz => dz.removePointerHover(this.idPointer));
                        while (element) {
                            // Check if we are on top of a dropZone
                            this.currentDropZone = this.possibleDropZones.get(element);
                            if (this.currentDropZone) {
                                this.currentDropZone.appendPointerHover(this.idPointer);
                                break;
                            }
                            element = element.parentElement;
                        }
                    }
                    return this;
                }
                getClone() {
                    if (this.cloneNode === null) {
                        this.cloneNode = this.root.cloneNode(true);
                        document.body.appendChild(this.cloneNode);
                        this.cloneNode.style.position = "absolute";
                        this.cloneNode.style.zIndex = "999";
                        this.cloneNode.classList.add("alx-cloneNode");
                    }
                    return this.cloneNode;
                }
            };
            __decorate([
                core_1.Input("alx-draggable"), 
                __metadata('design:type', Object)
            ], AlxDraggable.prototype, "data", void 0);
            __decorate([
                core_1.HostListener("mousedown", ["$event"]), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [MouseEvent]), 
                __metadata('design:returntype', void 0)
            ], AlxDraggable.prototype, "onMouseDown", null);
            __decorate([
                core_1.HostListener("touchstart", ["$event"]), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object]), 
                __metadata('design:returntype', void 0)
            ], AlxDraggable.prototype, "onTouchStart", null);
            AlxDraggable = __decorate([
                core_1.Directive({
                    selector: "*[alx-draggable]"
                }), 
                __metadata('design:paramtypes', [core_1.ElementRef])
            ], AlxDraggable);
            exports_1("AlxDraggable", AlxDraggable);
            AlxDropzone = class AlxDropzone {
                constructor(el) {
                    this.onDropEmitter = new core_1.EventEmitter();
                    // CSS when canDrop and startdraggable
                    this.dropCandidateofPointers = [];
                    this.pointersHover = [];
                    if (!dragDropInit) {
                        console.error("You should add one alx-dragdrop attribute to your code before using alx-dropzone");
                    }
                    this.root = el.nativeElement;
                    this.acceptFct = YES;
                    DM.registerDropZone(this);
                }
                drop(obj) {
                    console.log(this, "drop", obj);
                    this.onDropEmitter.emit(obj);
                }
                checkAccept(drag) {
                    let res = this.acceptFct(drag.data);
                    return res;
                }
                appendPointerHover(idPointer) {
                    if (this.pointersHover.indexOf(idPointer) === -1) {
                        this.pointersHover.push(idPointer);
                        if (this.dragHoverCSS) {
                            this.root.classList.add(this.dragHoverCSS);
                        }
                    }
                }
                removePointerHover(idPointer) {
                    let pos = this.pointersHover.indexOf(idPointer);
                    if (pos >= 0) {
                        this.pointersHover.splice(pos, 1);
                        if (this.pointersHover.length === 0 && this.dragHoverCSS) {
                            this.root.classList.remove(this.dragHoverCSS);
                        }
                    }
                }
                appendDropCandidatePointer(idPointer) {
                    //console.log( "appendDropCandidatePointer", idPointer, this );
                    if (this.dropCandidateofPointers.indexOf(idPointer) === -1) {
                        this.dropCandidateofPointers.push(idPointer);
                        //console.log( "\tadd class", this.dragStartCSS );
                        if (this.dragStartCSS) {
                            this.root.classList.add(this.dragStartCSS);
                        }
                    }
                }
                removeDropCandidatePointer(idPointer) {
                    let pos = this.dropCandidateofPointers.indexOf(idPointer);
                    if (pos >= 0) {
                        this.dropCandidateofPointers.splice(pos, 1);
                        if (this.dropCandidateofPointers.length === 0 && this.dragStartCSS) {
                            this.root.classList.remove(this.dragStartCSS);
                        }
                    }
                }
                ngOnInit() {
                    //console.log( "Init dropzone", this.dragStartCSS, this );
                    //this.root.style
                }
            };
            __decorate([
                core_1.Input("alx-accept-fct"), 
                __metadata('design:type', Function)
            ], AlxDropzone.prototype, "acceptFct", void 0);
            __decorate([
                // = (data) => true;
                core_1.Input("alx-dragstart-css"), 
                __metadata('design:type', String)
            ], AlxDropzone.prototype, "dragStartCSS", void 0);
            __decorate([
                core_1.Input("alx-draghover-css"), 
                __metadata('design:type', String)
            ], AlxDropzone.prototype, "dragHoverCSS", void 0);
            __decorate([
                core_1.Output("alx-ondrop"), 
                __metadata('design:type', Object)
            ], AlxDropzone.prototype, "onDropEmitter", void 0);
            AlxDropzone = __decorate([
                core_1.Directive({ selector: "*[alx-dropzone]" }), 
                __metadata('design:paramtypes', [core_1.ElementRef])
            ], AlxDropzone);
            exports_1("AlxDropzone", AlxDropzone);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRyYWdEcm9wL0RpcmVjdGl2ZXNEcmFnRHJvcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O3FCQTRESSxFQUFFLEVBRUYsWUFBWTtJQTBKaEIsb0RBQW9EO0lBQ3BELGFBQWEsSUFBSSxJQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDOzs7Ozs7Ozs7O1lBck5XLENBQUM7WUFDN0M7Ozs7Ozs7Ozs7Ozs7Z0JBYUk7WUFFSjtnQkFBQTtvQkFDSSxzQkFBaUIsR0FBSyxJQUFJLEdBQUcsRUFBd0IsQ0FBQztvQkFDdEQsY0FBUyxHQUFhLElBQUksR0FBRyxFQUF5QixDQUFDO2dCQXFDM0QsQ0FBQztnQkFwQ0csa0JBQWtCO2dCQUNYLFNBQVMsQ0FBQyxTQUFpQixFQUFFLE9BQXFCO29CQUNyRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsRUFBd0IsQ0FBQztvQkFDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUUsRUFBRTt3QkFDdEIsRUFBRSxDQUFBLENBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQzNCLEVBQUUsQ0FBQywwQkFBMEIsQ0FBRSxTQUFTLENBQUUsQ0FBQzs0QkFDM0MsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQ3ZDLENBQUM7b0JBQ0wsQ0FBQyxDQUFFLENBQUM7b0JBQ0osTUFBTSxDQUFDLGlCQUFpQixDQUFDO2dCQUM3QixDQUFDO2dCQUNNLHNCQUFzQixDQUFDLE9BQWdCO29CQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUUsT0FBTyxDQUFFLENBQUM7Z0JBQ3pDLENBQUM7Z0JBQ00sZ0JBQWdCLENBQUUsUUFBcUI7b0JBQzFD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QkFBQyxnQkFBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLENBQUM7OzJCQUFBO1lBQzNDLHFDQWtFQyxDQUFBIiwiZmlsZSI6IkRyYWdEcm9wL0RpcmVjdGl2ZXNEcmFnRHJvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgSG9zdExpc3RlbmVyLCBFdmVudEVtaXR0ZXIsIE91dHB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7bXlEb2N9IGZyb20gXCIuL0RyYWdEcm9wVXRpbHNcIjtcblxuLyogUG9seWZpbGwgVG91Y2hFdmVudCAqL1xuaW50ZXJmYWNlIE15VG91Y2hFdmVudCBleHRlbmRzIFRvdWNoRXZlbnQge307XG4vKlxuaW50ZXJmYWNlIFNoYWRvd1Jvb3QgZXh0ZW5kcyBEb2N1bWVudEZyYWdtZW50IHtcbiAgICBzdHlsZVNoZWV0cyAgICAgOiBTdHlsZVNoZWV0TGlzdDtcbiAgICBpbm5lckhUTUwgICAgICAgOiBzdHJpbmc7XG4gICAgaG9zdCAgICAgICAgICAgIDogRWxlbWVudDtcbiAgICBhY3RpdmVFbGVtZW50ICAgOiBFbGVtZW50O1xuICAgIGVsZW1lbnRGcm9tUG9pbnQgICAgICAgICh4IDogbnVtYmVyLCB5IDogbnVtYmVyKSA6IEVsZW1lbnQ7XG4gICAgZWxlbWVudHNGcm9tUG9pbnQgICAgICAgKHggOiBudW1iZXIsIHkgOiBudW1iZXIpIDogRWxlbWVudFtdO1xuICAgIGNhcmV0UG9zaXRpb25Gcm9tUG9pbnQgICh4IDogbnVtYmVyLCB5IDogbnVtYmVyKTsgLy8gPT4gQ2FyZXRQb3NpdGlvblxufTtcblxuaW50ZXJmYWNlIEVsZW1lbnRXaXRoU2hhZG93Um9vdCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBzaGFkb3dSb290ICA6IFNoYWRvd1Jvb3Q7XG59OyovXG5cbmNsYXNzIERyYWdNYW5hZ2VyIHtcbiAgICBkcmFnZ2VkU3RydWN0dXJlcyAgID0gbmV3IE1hcDxzdHJpbmcsIEFseERyYWdnYWJsZT4oKTtcbiAgICBkcm9wWm9uZXMgICAgICAgICAgID0gbmV3IE1hcDxFbGVtZW50LCBBbHhEcm9wem9uZSA+KCk7XG4gICAgLy9jb25zdHJ1Y3RvcigpIHt9XG4gICAgcHVibGljIHN0YXJ0RHJhZyhpZFBvaW50ZXI6IHN0cmluZywgZHJhZ2dlZDogQWx4RHJhZ2dhYmxlKSA6IE1hcDxFbGVtZW50LCBBbHhEcm9wem9uZT4ge1xuICAgICAgICB0aGlzLmRyYWdnZWRTdHJ1Y3R1cmVzLnNldChpZFBvaW50ZXIsIGRyYWdnZWQpO1xuICAgICAgICBsZXQgcG9zc2libGVEcm9wWm9uZXMgPSBuZXcgTWFwPEVsZW1lbnQsIEFseERyb3B6b25lPigpO1xuICAgICAgICB0aGlzLmRyb3Bab25lcy5mb3JFYWNoKCBkeiA9PiB7XG4gICAgICAgICAgICBpZiggZHouY2hlY2tBY2NlcHQoZHJhZ2dlZCkgKSB7XG4gICAgICAgICAgICAgICAgZHouYXBwZW5kRHJvcENhbmRpZGF0ZVBvaW50ZXIoIGlkUG9pbnRlciApO1xuICAgICAgICAgICAgICAgIHBvc3NpYmxlRHJvcFpvbmVzLnNldChkei5yb290LCBkeik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKTtcbiAgICAgICAgcmV0dXJuIHBvc3NpYmxlRHJvcFpvbmVzO1xuICAgIH1cbiAgICBwdWJsaWMgaXNBc3NvY2lhdGVkVG9Ecm9wWm9uZShlbGVtZW50OiBFbGVtZW50KSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kcm9wWm9uZXMuaGFzKCBlbGVtZW50ICk7XG4gICAgfVxuICAgIHB1YmxpYyByZWdpc3RlckRyb3Bab25lKCBkcm9wem9uZTogQWx4RHJvcHpvbmUgKSB7XG4gICAgICAgIHRoaXMuZHJvcFpvbmVzLnNldChkcm9wem9uZS5yb290LCBkcm9wem9uZSk7XG4gICAgfVxuICAgIHB1YmxpYyB1bnJlZ2lzdGVyRHJvcFpvbmUoIGRyb3B6b25lOiBBbHhEcm9wem9uZSApIHtcbiAgICAgICAgdGhpcy5kcm9wWm9uZXMuZGVsZXRlKGRyb3B6b25lLnJvb3QpO1xuICAgIH1cbiAgICBwdWJsaWMgcG9pbnRlck1vdmUoaWRQb2ludGVyOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyKSA6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgZHJhZ2dlZCA9IHRoaXMuZHJhZ2dlZFN0cnVjdHVyZXMuZ2V0KGlkUG9pbnRlcik7XG4gICAgICAgIGlmKGRyYWdnZWQpIHtcbiAgICAgICAgICAgIGRyYWdnZWQubW92ZSh4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZHJhZ2dlZCAhPT0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBwdWJsaWMgcG9pbnRlclJlbGVhc2UoaWRQb2ludGVyOiBzdHJpbmcpIDogYm9vbGVhbiB7XG4gICAgICAgIGxldCBkcmFnZ2VkID0gdGhpcy5kcmFnZ2VkU3RydWN0dXJlcy5nZXQoaWRQb2ludGVyKTtcbiAgICAgICAgaWYoZHJhZ2dlZCkge1xuICAgICAgICAgICAgZHJhZ2dlZC5zdG9wKCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdnZWRTdHJ1Y3R1cmVzLmRlbGV0ZShpZFBvaW50ZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkcmFnZ2VkICE9PSB1bmRlZmluZWQ7XG4gICAgfVxufTtcbmxldCBETSA9IG5ldyBEcmFnTWFuYWdlcigpO1xuXG5sZXQgZHJhZ0Ryb3BJbml0ID0gZmFsc2U7XG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCIqW2FseC1kcmFnZHJvcF1cIlxufSlcbmV4cG9ydCBjbGFzcyBBbHhEcmFnRHJvcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmKGRyYWdEcm9wSW5pdCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvciggXCJEbyBub3QgY3JlYXRlIG11bHRpcGxlIGluc3RhbmNlIG9mIGRpcmVjdGl2ZSBhbHgtZHJhZ2Ryb3AgIVwiICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyggXCJBbHhEcmFnRHJvcCBlbmFibGVkICFcIik7XG4gICAgICAgICAgICBkcmFnRHJvcEluaXQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIEBIb3N0TGlzdGVuZXIoIFwiZG9jdW1lbnQ6IG1vdXNlbW92ZVwiLCBbXCIkZXZlbnRcIl0gKSBtb3VzZW1vdmUoIGUgKSB7XG4gICAgICAgIERNLnBvaW50ZXJNb3ZlICAgKFwibW91c2VcIiwgZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIH1cbiAgICBASG9zdExpc3RlbmVyKCBcImRvY3VtZW50OiBtb3VzZXVwXCIgICwgW1wiJGV2ZW50XCJdICkgbW91c2V1cCAgKCBlICkge1xuICAgICAgICBETS5wb2ludGVyUmVsZWFzZShcIm1vdXNlXCIpO1xuICAgIH1cbiAgICBASG9zdExpc3RlbmVyKCBcImRvY3VtZW50OiB0b3VjaG1vdmVcIiwgW1wiJGV2ZW50XCJdICkgdG91Y2htb3ZlKCBlICkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0b3VjaDpUb3VjaCA9IGUuY2hhbmdlZFRvdWNoZXMuaXRlbShpKTtcbiAgICAgICAgICAgIGlmIChETS5wb2ludGVyTW92ZSh0b3VjaC5pZGVudGlmaWVyLnRvU3RyaW5nKCksIHRvdWNoLmNsaWVudFgsIHRvdWNoLmNsaWVudFkpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgQEhvc3RMaXN0ZW5lciggXCJkb2N1bWVudDogdG91Y2hlbmRcIiAsIFtcIiRldmVudFwiXSApIHRvdWNoZW5kICggZSApIHtcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8ZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRvdWNoIDogVG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzLml0ZW0oaSk7XG4gICAgICAgICAgICBpZiggRE0ucG9pbnRlclJlbGVhc2UodG91Y2guaWRlbnRpZmllci50b1N0cmluZygpKSApIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiKlthbHgtZHJhZ2dhYmxlXVwiXG59KVxuZXhwb3J0IGNsYXNzIEFseERyYWdnYWJsZSB7XG4gICAgQElucHV0KFwiYWx4LWRyYWdnYWJsZVwiKSBkYXRhOiBhbnk7XG4gICAgcHJpdmF0ZSBpc0JlaW5nRHJhZ2dlZCA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGNsb25lTm9kZSAgIDogSFRNTEVsZW1lbnQgPSBudWxsO1xuICAgIHByaXZhdGUgcG9zc2libGVEcm9wWm9uZXMgPSBuZXcgTWFwPEVsZW1lbnQsIEFseERyb3B6b25lPigpO1xuICAgIHByaXZhdGUgY3VycmVudERyb3Bab25lIDogQWx4RHJvcHpvbmU7XG4gICAgcHJpdmF0ZSBkeCA6IG51bWJlcjtcbiAgICBwcml2YXRlIGR5IDogbnVtYmVyO1xuICAgIHByaXZhdGUgb3ggOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBveSA6IG51bWJlcjtcbiAgICBwcml2YXRlIHR4IDogbnVtYmVyO1xuICAgIHByaXZhdGUgdHkgOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBpZFBvaW50ZXIgOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSByb290IDogSFRNTEVsZW1lbnQ7XG4gICAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5yb290ID0gZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgaWYoIWRyYWdEcm9wSW5pdCkge1xuICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiWW91IHNob3VsZCBhZGQgb25lIGFseC1kcmFnZHJvcCBhdHRyaWJ1dGUgdG8geW91ciBjb2RlIGJlZm9yZSB1c2luZyBhbHgtZHJhZ2dhYmxlXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vY29uc29sZS5sb2coIFwibmV3IGluc3RhbmNlIG9mIEFseERyYWdnYWJsZVwiLCB0aGlzICk7XG4gICAgfVxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICB9XG4gICAgQEhvc3RMaXN0ZW5lcihcIm1vdXNlZG93blwiICwgW1wiJGV2ZW50XCJdKSBvbk1vdXNlRG93biAoZXZlbnQgOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJtb3VzZWRvd24gb25cIiwgdGhpcywgZXZlbnQpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5zdGFydChcIm1vdXNlXCIsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgIH1cbiAgICBASG9zdExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBbXCIkZXZlbnRcIl0pIG9uVG91Y2hTdGFydChldmVudDogTXlUb3VjaEV2ZW50KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0b3VjaHN0YXJ0IG9uXCIsIHRoaXMpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8ZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0b3VjaCA6IFRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXMuaXRlbShpKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQodG91Y2guaWRlbnRpZmllci50b1N0cmluZygpLCB0b3VjaC5jbGllbnRYLCB0b3VjaC5jbGllbnRZKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGFydChpZFBvaW50ZXI6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgaWYoICF0aGlzLmlzQmVpbmdEcmFnZ2VkICkge1xuICAgICAgICAgICAgdGhpcy5pc0JlaW5nRHJhZ2dlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmlkUG9pbnRlciA9IGlkUG9pbnRlcjtcbiAgICAgICAgICAgIGxldCBiYm94ID0gdGhpcy5yb290LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5veCA9IHg7IHRoaXMub3kgPSB5O1xuICAgICAgICAgICAgdGhpcy5keCA9IHggLSBNYXRoLnJvdW5kKGJib3gubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCk7XG4gICAgICAgICAgICB0aGlzLmR5ID0geSAtIE1hdGgucm91bmQoYmJveC50b3AgICsgd2luZG93LnBhZ2VZT2Zmc2V0KTtcbiAgICAgICAgICAgIHRoaXMudHggPSBiYm94LndpZHRoO1xuICAgICAgICAgICAgdGhpcy50eSA9IGJib3guaGVpZ2h0Oy8vIGNvbnNvbGUubG9nKCBcImRyYWdcIiwgdGhpcy50eCwgYmJveC5yaWdodCAtIGJib3gubGVmdCApO1xuICAgICAgICAgICAgdGhpcy5wb3NzaWJsZURyb3Bab25lcyA9IERNLnN0YXJ0RHJhZyhpZFBvaW50ZXIsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuaXNCZWluZ0RyYWdnZWQgPSBmYWxzZTtcbiAgICAgICAgaWYodGhpcy5jbG9uZU5vZGUpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuY2xvbmVOb2RlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb25lTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuY2xvbmVOb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2xvbmVOb2RlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvc3NpYmxlRHJvcFpvbmVzLmZvckVhY2goIGR6ID0+IHtcbiAgICAgICAgICAgIGR6LnJlbW92ZURyb3BDYW5kaWRhdGVQb2ludGVyICAgKHRoaXMuaWRQb2ludGVyKTtcbiAgICAgICAgICAgIGR6LnJlbW92ZVBvaW50ZXJIb3ZlciAgICAgICAgICAgKHRoaXMuaWRQb2ludGVyKTtcbiAgICAgICAgfSApO1xuICAgICAgICB0aGlzLnBvc3NpYmxlRHJvcFpvbmVzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuaWRQb2ludGVyID0gbnVsbDtcbiAgICAgICAgaWYodGhpcy5jdXJyZW50RHJvcFpvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERyb3Bab25lLmRyb3AoIHRoaXMuZGF0YSApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudERyb3Bab25lID0gbnVsbDtcbiAgICB9XG4gICAgbW92ZSh4OiBudW1iZXIsIHk6IG51bWJlcikgOiB0aGlzIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgOiBFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgaWYodGhpcy5jbG9uZU5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vaWYoIE1hdGguYWJzKHgtdGhpcy5veCkgKyBNYXRoLmFicyh5LXRoaXMub3kpID4gNTAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDbG9uZSgpO1xuICAgICAgICAgICAgLy99XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5jbG9uZU5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvbmVOb2RlLnN0eWxlLmxlZnQgPSAoeCAtIHRoaXMuZHgpICsgXCJweFwiO1xuICAgICAgICAgICAgdGhpcy5jbG9uZU5vZGUuc3R5bGUudG9wICA9ICh5IC0gdGhpcy5keSkgKyBcInB4XCI7XG4gICAgICAgICAgICBsZXQgdmlzaWJpbGl0eSA9IHRoaXMuY2xvbmVOb2RlLnN0eWxlLnZpc2liaWxpdHk7XG4gICAgICAgICAgICB0aGlzLmNsb25lTm9kZS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgIC8vIGxldCBMID0gPEFycmF5PEVsZW1lbnQ+Pm15RG9jLmVsZW1lbnRzRnJvbVBvaW50KHgtd2luZG93LnBhZ2VYT2Zmc2V0LCB5LXdpbmRvdy5wYWdlWU9mZnNldCk7XG4gICAgICAgICAgICBlbGVtZW50ID0gbXlEb2MuZWxlbWVudEZyb21Qb2ludCh4LCB5KTsgLy8oeC13aW5kb3cucGFnZVhPZmZzZXQsIHktd2luZG93LnBhZ2VZT2Zmc2V0KTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coIFwiZWxlbWVudFwiLCBlbGVtZW50ICk7XG4gICAgICAgICAgICB0aGlzLmNsb25lTm9kZS5zdHlsZS52aXNpYmlsaXR5ID0gdmlzaWJpbGl0eTtcbiAgICAgICAgICAgIHRoaXMucG9zc2libGVEcm9wWm9uZXMuZm9yRWFjaCggZHogPT4gZHoucmVtb3ZlUG9pbnRlckhvdmVyKHRoaXMuaWRQb2ludGVyKSApO1xuICAgICAgICAgICAgd2hpbGUoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHdlIGFyZSBvbiB0b3Agb2YgYSBkcm9wWm9uZVxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERyb3Bab25lID0gdGhpcy5wb3NzaWJsZURyb3Bab25lcy5nZXQoIGVsZW1lbnQgKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmN1cnJlbnREcm9wWm9uZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREcm9wWm9uZS5hcHBlbmRQb2ludGVySG92ZXIoIHRoaXMuaWRQb2ludGVyICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gPEVsZW1lbnQ+ZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRDbG9uZSgpIDogTm9kZSB7XG4gICAgICAgIGlmKHRoaXMuY2xvbmVOb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNsb25lTm9kZSA9IDxIVE1MRWxlbWVudD50aGlzLnJvb3QuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggdGhpcy5jbG9uZU5vZGUgKTtcbiAgICAgICAgICAgIHRoaXMuY2xvbmVOb2RlLnN0eWxlLnBvc2l0aW9uICAgPSBcImFic29sdXRlXCI7XG4gICAgICAgICAgICB0aGlzLmNsb25lTm9kZS5zdHlsZS56SW5kZXggICAgID0gXCI5OTlcIjtcbiAgICAgICAgICAgIHRoaXMuY2xvbmVOb2RlLmNsYXNzTGlzdC5hZGQoIFwiYWx4LWNsb25lTm9kZVwiICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmVOb2RlO1xuICAgIH1cbn1cblxuLy8gZnVuY3Rpb24gbm9BY2NlcHRGY3QoZHJhZ2dlZERhdGEpIHtyZXR1cm4gZmFsc2U7fVxuZnVuY3Rpb24gWUVTKGRhdGEpIHtyZXR1cm4gdHJ1ZTt9XG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6IFwiKlthbHgtZHJvcHpvbmVdXCIgfSlcbmV4cG9ydCBjbGFzcyBBbHhEcm9wem9uZSB7XG4gICAgcHVibGljIHJvb3QgOiBIVE1MRWxlbWVudDtcbiAgICBASW5wdXQoXCJhbHgtYWNjZXB0LWZjdFwiKSAgICBhY2NlcHRGY3QgOiBGdW5jdGlvbjsgLy8gPSAoZGF0YSkgPT4gdHJ1ZTtcbiAgICBASW5wdXQoXCJhbHgtZHJhZ3N0YXJ0LWNzc1wiKSBkcmFnU3RhcnRDU1MgOiBzdHJpbmc7XG4gICAgQElucHV0KFwiYWx4LWRyYWdob3Zlci1jc3NcIikgZHJhZ0hvdmVyQ1NTIDogc3RyaW5nO1xuICAgIEBPdXRwdXQoXCJhbHgtb25kcm9wXCIpICAgICAgIG9uRHJvcEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvLyBDU1Mgd2hlbiBjYW5Ecm9wIGFuZCBzdGFydGRyYWdnYWJsZVxuICAgIHByaXZhdGUgZHJvcENhbmRpZGF0ZW9mUG9pbnRlcnMgOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgcHJpdmF0ZSBwb2ludGVyc0hvdmVyICAgICAgICAgICA6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZikge1xuICAgICAgICBpZighZHJhZ0Ryb3BJbml0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiWW91IHNob3VsZCBhZGQgb25lIGFseC1kcmFnZHJvcCBhdHRyaWJ1dGUgdG8geW91ciBjb2RlIGJlZm9yZSB1c2luZyBhbHgtZHJvcHpvbmVcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb290ID0gZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5hY2NlcHRGY3QgPSBZRVM7XG4gICAgICAgIERNLnJlZ2lzdGVyRHJvcFpvbmUodGhpcyk7XG4gICAgfVxuICAgIGRyb3AoIG9iaiApIHtcbiAgICAgICAgY29uc29sZS5sb2coIHRoaXMsIFwiZHJvcFwiLCBvYmogKTtcbiAgICAgICAgdGhpcy5vbkRyb3BFbWl0dGVyLmVtaXQoIG9iaiApO1xuICAgIH1cbiAgICBjaGVja0FjY2VwdChkcmFnOiBBbHhEcmFnZ2FibGUpIDogYm9vbGVhbiB7XG4gICAgICAgIGxldCByZXMgPSB0aGlzLmFjY2VwdEZjdCggZHJhZy5kYXRhICk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGFwcGVuZFBvaW50ZXJIb3ZlciggaWRQb2ludGVyOiBzdHJpbmcgKSB7XG4gICAgICAgIGlmKCB0aGlzLnBvaW50ZXJzSG92ZXIuaW5kZXhPZihpZFBvaW50ZXIpID09PSAtMSApIHtcbiAgICAgICAgICAgIHRoaXMucG9pbnRlcnNIb3Zlci5wdXNoKGlkUG9pbnRlcik7XG4gICAgICAgICAgICBpZih0aGlzLmRyYWdIb3ZlckNTUykge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5jbGFzc0xpc3QuYWRkKCB0aGlzLmRyYWdIb3ZlckNTUyApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZVBvaW50ZXJIb3ZlciggaWRQb2ludGVyOiBzdHJpbmcgKSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLnBvaW50ZXJzSG92ZXIuaW5kZXhPZihpZFBvaW50ZXIpO1xuICAgICAgICBpZiggcG9zID49IDAgKSB7XG4gICAgICAgICAgICB0aGlzLnBvaW50ZXJzSG92ZXIuc3BsaWNlKHBvcywgMSk7XG4gICAgICAgICAgICBpZih0aGlzLnBvaW50ZXJzSG92ZXIubGVuZ3RoID09PSAwICYmIHRoaXMuZHJhZ0hvdmVyQ1NTKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290LmNsYXNzTGlzdC5yZW1vdmUoIHRoaXMuZHJhZ0hvdmVyQ1NTICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXBwZW5kRHJvcENhbmRpZGF0ZVBvaW50ZXIoIGlkUG9pbnRlcjogc3RyaW5nICkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCBcImFwcGVuZERyb3BDYW5kaWRhdGVQb2ludGVyXCIsIGlkUG9pbnRlciwgdGhpcyApO1xuICAgICAgICBpZiggdGhpcy5kcm9wQ2FuZGlkYXRlb2ZQb2ludGVycy5pbmRleE9mKGlkUG9pbnRlcikgPT09IC0xICkge1xuICAgICAgICAgICAgdGhpcy5kcm9wQ2FuZGlkYXRlb2ZQb2ludGVycy5wdXNoKCBpZFBvaW50ZXIgKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coIFwiXFx0YWRkIGNsYXNzXCIsIHRoaXMuZHJhZ1N0YXJ0Q1NTICk7XG4gICAgICAgICAgICBpZih0aGlzLmRyYWdTdGFydENTUykge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5jbGFzc0xpc3QuYWRkKCB0aGlzLmRyYWdTdGFydENTUyApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZURyb3BDYW5kaWRhdGVQb2ludGVyKCBpZFBvaW50ZXI6IHN0cmluZyApIHtcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuZHJvcENhbmRpZGF0ZW9mUG9pbnRlcnMuaW5kZXhPZihpZFBvaW50ZXIpO1xuICAgICAgICBpZiggcG9zID49IDAgKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3BDYW5kaWRhdGVvZlBvaW50ZXJzLnNwbGljZShwb3MsIDEpO1xuICAgICAgICAgICAgaWYodGhpcy5kcm9wQ2FuZGlkYXRlb2ZQb2ludGVycy5sZW5ndGggPT09IDAgJiYgdGhpcy5kcmFnU3RhcnRDU1MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3QuY2xhc3NMaXN0LnJlbW92ZSggdGhpcy5kcmFnU3RhcnRDU1MgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyggXCJJbml0IGRyb3B6b25lXCIsIHRoaXMuZHJhZ1N0YXJ0Q1NTLCB0aGlzICk7XG4gICAgICAgIC8vdGhpcy5yb290LnN0eWxlXG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
