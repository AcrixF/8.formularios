import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { promise } from "selenium-webdriver";
import { Observable } from "rxjs";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  forma: FormGroup;
  usuario: any= {
    nombreCompleto:{
      nombre:"Cristian",
      apellido:"Flores",
    },
    correo: "acrixf@gmail.com",
    //pasatiempos: ['comer','dormir','seguir comiendo']
  }

  constructor() {

    console.log(this.usuario);
  }

  ngOnInit() {

    this.forma = new FormGroup({

      'nombreCompleto':new FormGroup({
        'nombre': new FormControl('',[Validators.required,Validators.minLength(5)]),
        'apellido': new FormControl('',[Validators.required, this.noHerrera])
      }),
      'correo': new FormControl('',[ Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'pasatiempos': new FormArray([
        new FormControl('correr',Validators.required)
      ]),
      'username': new FormControl('',Validators.required, this.existeUsuario),
      'password1': new FormControl('',Validators.required),
      'password2': new FormControl()


    });

    this.forma.controls['password2'].setValidators([Validators.required, this.validaPassword.bind(this.forma)])

    //Detecta los cambios en el formulario
    //this.forma.valueChanges.subscribe( data => console.log(data))

    this.forma.controls['username'].valueChanges.subscribe( data =>{
      console.log(data);
    });

    //Detecta el status de un campo en especifico
    this.forma.controls['username'].statusChanges.subscribe( data =>{
      console.log(data);
    })

    //Settea los datos por default
    //this.forma.setValue(this.usuario);


  }

  guardarCambios(){
      console.log(this.usuario);
      console.log(this.forma);

    //Se resetean los valores por defecto de la forma
    /*
    this.forma.reset({
      nombreCompleto:{
        nombre:"",
        apellido:""
      },
      correo:""
    })
    */

  }


  agregarPasatiempo(){
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('Comer', Validators.required)
    )
  }



  //Validaciones personalizadas
  noHerrera( control:FormControl): {[s: string]:boolean}{
    if (control.value === "Flores"){
      return {
        noHerrera:true
      }
    }
    return null;
  }

  validaPassword(control: FormControl):{[s:string]:boolean}{

    let forma: any = this;

    if (control.value !== forma.controls['password1'].value){
      return{
        noiguales:true
      }
    }
    return null;
  }


  existeUsuario(control: FormControl): Promise<any> | Observable<any>{

    let promesa = new Promise( (resolve,reject) => {
      setTimeout( () => {
        if (control.value === "Neoa"){
          resolve( {existe:true});
        }else{
          resolve( null );
        }
      },3000)

    })

    return promesa;
  }


}
