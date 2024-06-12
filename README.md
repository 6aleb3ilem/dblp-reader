# Projet SGBD-avancee DBLP Visualizer


## Usage 
install mongodb and make sure it is running 

![Screenshot from 2024-06-12 17-16-34](https://github.com/6aleb3ilem/dblp-reader/assets/121716974/73f54782-7e1c-4c71-8378-ae26bdcf75ca)

install nodejs and npm 

nodejs

![Screenshot from 2024-06-12 17-28-44](https://github.com/6aleb3ilem/dblp-reader/assets/121716974/4a4f3406-ecdf-4ccf-b0d5-7eb6cc37881f)

npm 

![Screenshot from 2024-06-12 17-28-44](https://github.com/6aleb3ilem/dblp-reader/assets/121716974/93943022-aa80-422d-9e28-6b3acaa28c7c)

the database  could be downloaded from this link [DBLP.json.zip](http://b3d.bdpedia.fr/files/dblp.json.zip)

Unzip the dblp.json.zip file

Import data into MongoDB with the next command 
``` bash 
mongoimport --db dblp --collection publis --file /path/to/dblp.json --jsonArray
```


```  bash
    
    git clone https://github.com/6aleb3ilem/dblp-reader.git

    cd dblp-reader 

    npm install

    node server.js

    cd frontend

    npm install

    npm run dev 
```


## Screenshots
![Screenshot from 2024-06-12 17-42-48](https://github.com/6aleb3ilem/dblp-reader/assets/121716974/e9703484-f3c9-427b-9aba-1afe4bcbebce)





