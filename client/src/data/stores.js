// Locales de Valsaa. El id coincide con el que valida el server para "retiro en local".
export const STORES = [
    {
        id: 'pocitos',
        name: 'LOCAL POCITOS',
        image: '/img/local.jpg',
        address: '21 de Setiembre 1584, Montevideo - Montevideo.',
        hours: 'Lunes a sábado 9:00 a 20:00 hs. Domingos 10 a 18hs.',
        phone: '26031916',
    },
    {
        id: 'punta-del-este',
        name: 'PUNTA DEL ESTE',
        image: '/img/local2.webp',
        address: 'Av. Gorlero 1584, Punta del Este - Maldonado.',
        hours: 'Lunes a sábado 10:00 a 19:00 hs.',
        phone: '26031157',
    },
];

export const findStore = (id) => STORES.find(store => store.id === id);

export const DEPARTMENTS = [
    'Artigas', 'Canelones', 'Cerro Largo', 'Colonia', 'Durazno', 'Flores', 'Florida', 'Lavalleja',
    'Maldonado', 'Montevideo', 'Paysandú', 'Río Negro', 'Rivera', 'Rocha', 'Salto', 'San José',
    'Soriano', 'Tacuarembó', 'Treinta y Tres',
];
