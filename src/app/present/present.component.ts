import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.css']
})
export class PresentComponent implements OnInit {
  devis: string = "";

  constructor(router: Router ) {
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(true); }
        }
      }
    });

  }

  ngOnInit() {

  }
  devisDev(){
    this.devis = "[Devis-DEV]\n"
    console.log(this.devis)
  }
  devisGraph(){
    this.devis = "[Devis-GRAPH]\n"
  }
}
