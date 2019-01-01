import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

 query ={
    email:'',
    message:'',
    name:'',
    date:''
  };
  questions;
  constructor(private api:ApiService) { 
    this.questions =
    [
      {
        query: 'What is smartClass?',
        // tslint:disable-next-line:max-line-length
        answer: `Smart Classroom (smartClass) is a highly innovative and smart way of managing classes.  `,
        hide: false
      },
      {
        query: 'How does Smart Class works?',
        // tslint:disable-next-line:max-line-length
        answer: `It provides hassle free course enrollements with the help of qr code `,
        hide: false
      }
      // {
      //   query: 'Is OPV safe for sick children and newborns?',
      //   // tslint:disable-next-line:max-line-length
      // tslint:disable-next-line:max-line-length
      //   answer: `The Acute Flaccid Paralysis Surveillance system is a critical part of the protection available for families against smartClass. If a child suddenly shows signs of a floppy, or weak arm or leg, health authorities should be informed immediately so that a sample of the child's faeces can be taken for analysis and the child can get proper treatment. It is very important to act fast – smartClass is VERY infectious. `,
      //   hide: true
      // },
    ];
  }

  
  faqs;
  ngOnInit() {
 
  }



  getFAQs(){
    // this.api.getFAQS().map(actions => {
    //   return actions.map(a => {
    //     const data = a.payload.doc.data()
    //     const id = a.payload.doc.id;
    //     let hide = false;
    //     return { id, ...data };
    //   })

    // }).subscribe(resp=>{
    //   this.faqs = resp;
    // })
  }

  sendQuery(){
    if(this.query.message && this.query.email){
      let x = new Date().toLocaleDateString();
      this.query.date = x;
      // this.api.saveQuery(this.query).then(r=>{
      //   this.query ={
      //     email:'',
      //     message:'',
      //     name:'',
      //     date:''
      //   };
      //   alert('Query sent to the adminstration! Thanks.')
      // })
    }
  
  }


  
}
