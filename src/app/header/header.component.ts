import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
notifier = new Subject();
@ViewChild('nav') header:ElementRef;
notifier$ = this.notifier.asObservable();
scrollPos: number;
fadeProp:boolean;

  constructor() {}
  getYPosition(e: Event):number {
    return (e.target as Document).documentElement.scrollTop; 
  }
  ngOnInit(): void {
    fromEvent(window,'scroll').pipe(takeUntil(this.notifier$)).subscribe({
      next:(e:Event)=>
      this.scrollPos = this.getYPosition(e),
    });
  }
  @HostListener('window:scroll')
  onWindowScroll() {
    const headerHeight = this.header?.nativeElement.offsetHeight;
    if(this.scrollPos >= headerHeight){
      this.fadeProp = true;
    } else {
      this.fadeProp = false;
    }
  }

  ngOnDestroy(): void {
    this.notifier.next();
  }
}
