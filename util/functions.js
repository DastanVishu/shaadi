var mini = {};

mini.generateOtpCode = () =>{
    return Math.floor(Math.random()*1000000000);
}

module.exports = mini;