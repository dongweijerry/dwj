/**
 * Created by dongwei on 16/9/18.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize('dwj', 'postgres', 'dw2587758',{
    host:'localhost',
    port:'5432',
    dialect:'postgres',
    pool:{
        min:0,
        max:20,
        idle: 10000
    },
    version:1.0,
    sync:{
        force: true
    }
});
sequelize
.authenticate()
.then(function(err) {
    console.log('Connection successfully.');
})
.catch(function (err) {
    console.log('Unable to connect to the database:', err);
});

var User = sequelize.define('user',{
    userName:{
        type:Sequelize.STRING,
        defaultValue:'',
        field:'user_name',
        unique:true
    },
    phone:{
        type:Sequelize.STRING,
        defaultValue:''
    },
    name:{
        type:Sequelize.STRING,
        defaultValue:''
    },
    password:{
        type:Sequelize.STRING,
        defaultValue:'',
        allowNull:false
    },
    deleteFlag:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },
    wechat:{
        type:Sequelize.STRING,
        defaultValue:''
    }
},{timestamps:false,defaultScope:{where:{deleteFlag:false}}});

var Activity = sequelize.define('activity',{
    subject:{
        type:Sequelize.STRING,
        defaultValue:'',
        allowNull:false
    },
    content:{
        type:Sequelize.STRING,
        defaultValue:''
    },
    createBy:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    maxMemberNum:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    minMemberNum:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    location:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
},{timestamps:false});

var Member = sequelize.define('member',{
    activity:{
        type:Sequelize.STRING,
        defaultValue:'',
        allowNull:false
    },
    user:{
        type:Sequelize.STRING,
        defaultValue:''
    },
    date:{
        type:Sequelize.DATE,
        defaultValue:new Date()
    }
},{timestamps:false});

var Location = sequelize.define('location',{
    address:{
        type:Sequelize.STRING,
        defaultValue:''
    },
    longitude:{
        type:Sequelize.DOUBLE,
        defaultValue:0
    },
    latitude:{
        type:Sequelize.DOUBLE,
        defaultValue:0
    },
    province:{
        type:Sequelize.STRING,
        defaultValue:''
    },
    city:{
        type:Sequelize.STRING,
        defaultValue:''
    }
},{timestamps:false});

// Activity.belongsTo(User,{foreignKey:'creat_by'});
// Activity.belongsTo(User,{foreignKey:'updat_by'});
// Activity.hasMany(User,{foreignKey:'membars'});
// Activity.belongsTo(Location,{foreignKey:'location_at'});

sequelize.sync().then(function(){
    User.create({userName:'test2',password:'test2',phone:'18321482348',name:'test2'});
    User.create({userName:'test1',password:'test1',phone:'18321482349',name:'test1'}).then(function(data){
        User.findOne({where:{userName:'test1'}}).then(function(user){
            Activity.create({subject:'约吧',content:'约跑,约趴,约架,约在一起撸个串',createBy:user.id,maxMemberNum:10,minMemberNum:3}).then(function(activity){
                Member.create({activity:activity.id,user:user.id,date:new Date()});
            });
        });
    });
});

exports={
    User:User,
    Activity:Activity,
    Member:Member,
    Location:Location
}