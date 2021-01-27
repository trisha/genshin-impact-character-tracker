/* TERMINAL COMMANDS  
// Install npm and sequelize
npm i sequelize pg

sequelize model:create --name myCharacter --attributes name:string,weapon:string,level:integer,maxLevel:integer,aaLevel:integer,eLevel:integer,qLevel:integer,maxTalentLevel:integer,constellation:integer

sequelize model:create --name goal --attributes li:text

sequelize model:create --name stockCharacter --attributes name:string,description:text,rarity:integer,vision:string,weapon:string,region:string,ascStat:string,headUrl:text,portraitUrl:text,wishUrl:text

sequelize db:migrate

DROP TABLE "stockCharacters";


*/ 