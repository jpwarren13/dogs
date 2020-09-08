function getSize(weight){
    const small = 20;
    const medium = 50;
    const large = 100;
    switch(weight){
        case weight<20: 
          return 'SM';
        case weight <50: 
          return 'MD';
        case weight <100:
        return 'LG';
        default: 
          return 'XL'
    }

}

let male = false;
function getNames(){
    const gender = male ? 'boy_names' : 'girl_names';
    male = !male;
    const headers = new Headers();
    return fetch(`https://namey.muffinlabs.com/name.json?count=2&with_surname=false&frequency=common`, {headers, mode: 'cors'}).then(names => {

        return names.json();}).then(resolvedName => {

    console.log("NAMES", resolvedName)
    return {name: resolvedName[0], owner: resolvedName[1]}
    }).catch(e => console.error('Error retrieving names', e))
}
function getRandomBreed(){
    const headers = new Headers();
    headers.append('x-api-key', process.env.API_KEY)
    return fetch('https://api.thedogapi.com/v1/breeds?attach_breed=0').then(resp => {
        return resp.json();}).then(response => {
        const randomBreed = Math.floor(Math.random() * Math.floor(response.length-1));
        //weight: {imperial: "50 - 60", metric: "23 - 27"}
        console.log(response)
        const averageWeight = response[randomBreed].weight.imperial.split('-').map(l => Number(l.trim())).reduce((acc, curr) => {acc += curr; return acc}, 0);
        return {breed: response[randomBreed].name, size: getSize(averageWeight), description: response[randomBreed].bred_for}
    })
    // .then(({breed, size}) => ({breed, size, names: getNames()})).then(({breed, size, names})=> console.log("WE GOT THEM ALL", breed, size, names)).catch((e) => console.log('THERE WAS AN ERROR RETRIEVING DOG NAME', e));
}
// console.log(getNames())
function generateDog(){
    return Promise.all([getRandomBreed(), getNames()]).then(([breeds, names]) =>{return {...breeds, ...names}})
}
module.exports = {
    generateDog,
    getRandomBreed
}