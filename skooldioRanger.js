var request = require('request');

var herolist = ['test', 'nun', 'tong', 'ta'];
var teamSize = 10;
var minimalToWin = teamSize / 2;
function snap(herolist, isRandomMode, callback) {
  // async await call api
  request.post(
    'https://asia-east2-skooldio-courses.cloudfunctions.net/es6/snap',
    {
      json: {
        isRandom: isRandomMode,
        heroList: herolist,
      },
    },
    function(error, response, body) {
      herolist = body.heroLeft;
      console.log('\nAfter The Snap, we have \n' + herolist + ' left.\n');
      callback(herolist, afterFightCallback);
    }
  );
}

function Hero(human, animal) {
  this.realName = human.name;
  this.gender = human.gender;
  this.animalName = animal.type;
  this.heroName = this.animalName + ' ' + this.gender;
}

Hero.prototype.useSkill = function() {
  return this.skill;
};

function randomArray(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

var nameList = ['John', 'Nat', 'Tony'];
var familyNameList = ['Doe', 'Stark'];
var genderList = ['Man', 'Woman', 'Boy', 'Girl', 'Baby', 'King', 'Queen'];
var animalTypeList = ['Cat', 'Ant', 'Spider', 'Elephant', 'Shark', 'Lion', 'Tiger'];

function getNewMember(human, animal) {
  var name = randomArray(nameList);
  var familyName = randomArray(familyNameList);
  var gender = randomArray(genderList);
  var animalType = randomArray(animalTypeList);
  var human = {
    name: name,
    familyName: familyName,
    gender: gender,
  };
  var animal = {
    type: animalType,
  };
  var newHero = new Hero(human, animal);
  return newHero;
}

function afterFightCallback(winCount) {
  if (winCount > minimalToWin) {
    console.log('\nYou Team Win');
  } else {
    console.log('\nYou Team Lose');
  }
}

function fightBack(herolist, afterFightCallback) {
  var recruitCount = teamSize - herolist.length;
  console.log('\nTo Fight Back we have to get more ' + recruitCount + ' members');
  console.log('\n...Start recruit new members...');

  for (var i = 0; i < recruitCount; i++) {
    var hero = getNewMember();
    console.log('OK, We have ' + hero.name + ' ' + 'AKA' + ' ' + hero.realName + ' now.');
    herolist.push(hero);
  }
  var winCount = 0;
  var fightCount = 0;
  console.log('\nNow we have ' + herolist.length + ' members');
  console.log('\nReady to Fight Back....\ngo\ngo\ngo');
  for (var i = 0; i < herolist.length; i++) {
    var hero = herolist[i];
    request('https://asia-east2-skooldio-courses.cloudfunctions.net/es6/fight', function(
      error,
      response,
      body
    ) {
      var result = JSON.parse(body);
      var fightResult = result.isWinTheFight;
      console.log(hero.heroName + ' ' + (fightResult ? 'win ' : 'lose ') + 'the fight.');
      fightCount++;
      if (fightResult) winCount++;
      if (fightCount == teamSize) afterFightCallback(winCount);
    });
  }
}
console.log("\t'The Skooldio Rangers'\nEpisode 0: Let Fight Back Skooldio Rangers!!!");
console.log('\nBefore The Snap, we have\n' + herolist);
snap(herolist, true, fightBack);
