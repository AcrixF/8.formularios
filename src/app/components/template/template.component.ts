import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`.ng-invalid.ng-touched:not(form){
    border: 1px solid red;
  }`]
})
export class TemplateComponent implements OnInit {

  usuario: Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais : "",
    sexo: "",
    aceptar: false
  }

  paises = [
    {
      codigo:"CRI",
      nombre: "Costa Rica"
    },
    {
      codigo:"ESP",
      nombre:"España"
    }
    ];


  sexos: string[] = ["Hombre","Mujer", "Sin definir"];

  constructor() { }

  ngOnInit() {
  }

  guardar(forma:any){
    console.log("Posteado")
    console.log("NgForm", forma);
    console.log("valor", forma.value)
  }

}
