/* TERMINAL COMMANDS  
// Install npm and sequelize
npm i sequelize pg

sequelize model:create --name user --attributes name:string,email:string,password:string,UID:integer,forumId:integer
// Associations: 
    models.stockCharacter.hasMany(models.myCharacter)

sequelize model:create --name myCharacter --attributes name:string,weapon:string,level:integer,maxLevel:integer,aaLevel:integer,eLevel:integer,qLevel:integer,maxTalentLevel:integer,constellation:integer,userId:integer,goalId:integer,stockCharacterId:integer
// Associations: 
    models.myCharacter.belongsTo(models.user)
    models.myCharacter.belongsTo(models.stockCharacter)
    models.myCharacter.hasMany(models.goal)

sequelize model:create --name goal --attributes li:text,myCharacterId:integer
// Associations: 
    models.goal.belongsTo(models.myCharacter)

sequelize model:create --name stockCharacter --attributes name:string,description:text,rarity:integer,vision:string,weapon:string,region:string,ascStat:string,headUrl:text,portraitUrl:text,wishUrl:text,myCharacterId:integer
// Associations: 
    models.stockCharacter.hasMany(models.myCharacter)

sequelize db:migrate

/////////////////////// SQL SHORTCUTS /////////////////////////////
DROP TABLE "stockCharacters"; ...to delete a table. Double quotes to escape capitalized letters, where SQL otherwise only accepts single quotes in commands.
SELECT COUNT(*) FROM table_name; ...to get count of rows.
DELETE FROM table_name; ...to clear a table's contents but retain its schema.

*/ 
const db = require('./models')

db.stockCharacter.findOne({
    where: {
        name: 'Keqing'
    }
})
.then(stockChar => {
    console.log('🐷stockChar: ', stockChar)
})