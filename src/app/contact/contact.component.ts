import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Comment } from '../models/commentModels';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  @Input() devisType;
  cacheDevis: string;
  msg : string = "";
  commentForm : FormGroup;
  toast: String ='';
  toastClass: boolean;
  infoClass : boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private contactService : ContactService,
    private route : Router) { }

  ngOnInit() {
    this.initForm();
  }
  //Initialisation d'un formullair vide pour les message utilisateur
  initForm(){
    this.commentForm = this.formBuilder.group({
      email : '',
      content: this.devisType
    });
    console.log('je suis dans le devisType vide')
  }

  ngOnChanges(changes: SimpleChange){
    for(const devisType in changes){
      console.log(changes[devisType]);
      if(this.devisType  != this.cacheDevis && changes[devisType].firstChange == false){
        this.initForm();
        this.msg = "Pour devis, merci de ne pas effacer le décorateur " + this.devisType;
        if(this.infoClass){
          this.toastClass = null;
        }
        this.toastView(this.msg);
        console.log(this.toastClass);
      }
    }
  }

  //gestion de l'envoie des message depuis le formulaire
  onSubmitForm(){
    const formValue = this.commentForm.value;
    const newComment = new Comment(
      formValue['email'],
      formValue['content']
    );
    if (this.contactService.sendComment(newComment)){
      this.msg = "Votre message à était envoyée!";
      this.toastView(this.msg);
      this.toastClass = true;
      this.infoClass = false;
    }else{
      this.msg ="Nous avons rencotré un problème, votre message na était envoyer!";
      this.toastView(this.msg);
      this.toastClass = false;
      this.infoClass = false;
    };
    this.devisType="";
    this.initForm();
    
  }
  toastView(txt : string){
    this.toast = txt;
    setTimeout(()=>{
      this.toast = ''
    },10000);
  }
}
