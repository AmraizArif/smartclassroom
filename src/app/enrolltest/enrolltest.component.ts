import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enrolltest',
  templateUrl: './enrolltest.component.html',
  styleUrls: ['./enrolltest.component.css']
})
export class EnrolltestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  syncChanges(list, ref) {
    ref.on('child_added', function _add(snap, prevChild) {
      var data = snap.val();
      data.$id = snap.key(); // assumes data is always an object
      var pos = this.positionAfter(list, prevChild);
      list.splice(pos, 0, data);
    });
  }
   getSynchronizedArray(firebaseRef) {
    var list = [];
     this.syncChanges(list, firebaseRef);
    return list;
  }
  
   positionFor(list, key) {
    for(var i = 0, len = list.length; i < len; i++) {
      if( list[i].$id === key ) {
        return i;
      }
    }
    return -1;
  }
  
   positionAfter(list, prevChild) {
    if( prevChild === null ) {
      return 0;
    }
    else {
      var i = this.positionFor(list, prevChild);
      if( i === -1 ) {
        return list.length;
      }
      else {
        return i+1;
      }
    }
  }
  
}
