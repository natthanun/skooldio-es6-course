//SKOOLDIO RANGERS
var request = require('request');

var initSize = 10;
var teamSize = 15;
var minimalToWin = teamSize / 2;

var heroList = [];

var firstNameList = ['John', 'Nate', 'Tony', 'Sarah', 'Christina', 'Jane'];
var lastNameList = ['Wick', 'Stark', 'Rogers', 'Lee'];
var genderList = ['Man', 'Woman', 'Boy', 'Girl', 'Baby', 'King', 'Queen'];
var animalTypeList = ['Cat', 'Ant', 'Spider', 'Elephant', 'Shark', 'Lion', 'Tiger'];

function Hero(human, animal) {
  this.displayName = human.displayName;
  this.gender = human.gender;
  this.animalName = animal.type;
  this.name = this.animalName + this.gender;
}

Hero.prototype.useSkill = function() {
  return this.skill;
};

function randomArray(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getNewMember() {
  var firstName = randomArray(firstNameList);
  var lastName = randomArray(lastNameList);
  var gender = randomArray(genderList);
  var animalType = randomArray(animalTypeList);
  var human = {
    firstName: firstName,
    lastName: lastName,
    displayName: firstName + ' ' + lastName,
    gender: gender,
  };
  var animal = {
    type: animalType,
  };
  var newHero = new Hero(human, animal);
  return newHero;
}

function initMembers() {
  for (var i = 0; i < initSize; i++) {
    heroList.push(getNewMember());
  }
}

function snap(heroList, isRandomMode, callback) {
  request.post(
    'https://asia-east2-skooldio-courses.cloudfunctions.net/es6/snap',
    {
      json: {
        isRandom: isRandomMode,
        heroList: heroList,
      },
    },
    function(error, response, body) {
      heroList = body.heroLeft;
      console.log('\nAfter The Snap, we have \n' + heroList.map(hero => hero.name) + ' left.\n');
      callback(heroList, afterFightCallback);
    }
  );
}

function fightBack(heroList, afterFightCallback) {
  var recruitCount = teamSize - heroList.length;
  console.log('\nTo Fight Back we have to get ' + recruitCount + ' more members');
  console.log('\n...Start recruiting new members...');

  for (var i = 0; i < recruitCount; i++) {
    var hero = getNewMember();
    console.log('OK, we have ' + hero.name + ' ' + 'AKA' + ' ' + hero.displayName + ' now.');
    heroList.push(hero);
  }
  var winCount = 0;
  var fightCount = 0;
  console.log('\nNow we have ' + heroList.length + ' members');
  console.log('\nReady to Fight Back....\ngo\ngo\ngo');
  for (var i = 0; i < heroList.length; i++) {
    var hero = heroList[i];
    request('https://asia-east2-skooldio-courses.cloudfunctions.net/es6/fight', function(
      error,
      response,
      body
    ) {
      var result = JSON.parse(body);
      var fightResult = result.isWinTheFight;
      console.log(hero.name + ' ' + (fightResult ? 'won ' : 'lost ') + 'the fight.');
      fightCount++;
      if (fightResult) winCount++;
      if (fightCount == teamSize) afterFightCallback(winCount);
    });
  }
}

function afterFightCallback(winCount) {
  if (winCount > minimalToWin) {
    console.log('\nYour team has won');
  } else {
    console.log('\nYour team has lost');
  }
}

initMembers();
console.log("\t'The Skooldio Rangers'\nEpisode 0: Let's Fight Back, Skooldio Rangers!!!");
console.log('\nBefore The Snap, we have\n' + heroList.map(hero => hero.name));
snap(heroList, true, fightBack);
