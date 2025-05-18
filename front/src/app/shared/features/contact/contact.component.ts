import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Contact } from './model/contact.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, InputTextareaModule, ToastModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers: [MessageService],

})
export class ContactComponent {
  public contactForm!: FormGroup;
  public contact!: Contact;
  public isFormSubmitted: boolean = false

  get f() {
    return this.contactForm.controls
  }
  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.initContactForm()
  }
  initContactForm() {
    this.contactForm = this.fb.group({
      name: [null],
      email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      message: [null, [Validators.required, Validators.maxLength(300)]],
    });
  }
  onSubmit() {
    this.isFormSubmitted = true
    if (this.contactForm.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Demande de contact envoyée avec succès',
      });

      this.contactForm.reset();

      this.isFormSubmitted = false

    }
  }
  isInvalid(field: string): boolean {

    const control = this.f[field];
    return control && (control.invalid && (control.dirty || control.touched));
  }
}
