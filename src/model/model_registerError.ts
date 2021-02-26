import * as fs from 'fs';

export const errorRegister = (error: string) => {
    try {
        const data = fs.readFileSync('console.txt');

        fs.writeFile('console.txt', `${data} \n Erro: ${error} \n`, function (err) {
            if (err)
                return console.log(err);
            console.log('Error registred! ' + error);
        });

        return;
    } catch (error) {
        console.log(error);
    }    
}