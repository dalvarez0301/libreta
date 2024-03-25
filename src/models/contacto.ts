import type { IContacto } from '../types/IContactos'

export class Contacto {

    contactos: IContacto[];

    constructor() {
        this.contactos = [];
    }

    agregarContacto(contacto: IContacto) {
        //crear un nuevo contacto 
        fetch('https://65f79895b4f842e80885ba6c.mockapi.io/contactos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contacto)
        }).then(response => response.json())
            .then(data => {
                this.contactos.push(data);
            });
    }

    async editarContacto(cedula: string, contacto: IContacto) {
        try {
            const response = await fetch(`https://65f79895b4f842e80885ba6c.mockapi.io/contactos/${cedula}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contacto)
            });
            
            if (!response.ok) {
                throw new Error('Error al actualizar el contacto');
            }
            
            const data = await response.json();
            const index = this.contactos.findIndex((contacto) => contacto.cedula === cedula);
            this.contactos[index] = data;
            
            return data; // opcional: puedes devolver los datos actualizados del contacto si lo deseas
        } catch (error) {
            console.error(error);
            throw error; // lanzar el error para que pueda ser manejado externamente
        }
    }
    

    async obtenerContactos() {
        const response = await fetch('https://65f79895b4f842e80885ba6c.mockapi.io/contactos');
        const data = await response.json();
        const contactos = data.map((contacto:any) => {
            return contacto;
        });
        this.contactos = contactos;
    }

    async obtenerContacto(cedula: string) {
        const response = await fetch(`https://65f79895b4f842e80885ba6c.mockapi.io/contactos/${cedula}`);
        const data = await response.json();
        return data;
    }

}